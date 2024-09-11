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

connectToDatabase(ATLAS_URI)
    .then((db) => {
        const app = express();
        app.use(cors());
        app.use(express.json());
        
        app.use('/feeds', feedRouter);
        app.use('/users', userRouter);
        app.use('/user-feeds', userFeedRouter);
        app.use('/articles', articleRoutes(db));

        app.listen(5200, () => console.log('Server running'));
    })
    .catch(console.error);