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

let dbConnection: any = null;

// Middleware to ensure database connection
const ensureDbConnection = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!dbConnection) {
        try {
            dbConnection = await connectToDatabase(ATLAS_URI);
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Failed to connect to MongoDB', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    next();
};

app.use(ensureDbConnection);

app.use('/api/feeds', feedRouter);
app.use('/api/users', userRouter);
app.use('/api/user-feeds', userFeedRouter);
app.use('/api/articles', articleRoutes(dbConnection));

// Health check route
app.get('/api/health', (req, res) => {
    res.status(200).send('OK');
});

// Only start the server if we're not in a Vercel environment
if (process.env.VERCEL !== '1') {
    const PORT = process.env.PORT || 5200;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;