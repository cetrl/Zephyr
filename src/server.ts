import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './database';
import { feedRouter } from './routes/feed.routes';
import articleRoutes from './routes/article.routes';
import { userRouter } from './routes/user.routes';
import { userFeedRouter } from './routes/user-feed.router';

config();

const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
    console.error('No ATLAS_URI environment variable has been defined in config.env');
    process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());

app.use('/feeds', feedRouter);
app.use('/users', userRouter);
app.use('/user-feeds', userFeedRouter);

// We'll connect to the database and set up the articles route when the app is initialized
let dbConnection: any = null;
connectToDatabase(ATLAS_URI)
    .then((db) => {
        dbConnection = db;
        app.use('/articles', articleRoutes(db));
        console.log('Connected to MongoDB');
    })
    .catch(console.error);

// This route can be used by Vercel to keep the serverless function warm
app.get('/api/health', (req, res) => {
    res.status(200).send('OK');
});

// Only start the server if we're not in a Vercel environment
if (process.env.VERCEL !== '1') {
    const PORT = process.env.PORT || 5200;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;