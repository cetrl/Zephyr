import express from 'express';
import { ObjectId, Db } from 'mongodb';
import { Feed } from '../models/feed';
import { parseRssFeed } from '../services/rss-parser';

export default function(db: Db) {
    const router = express.Router();

    // route retrieving a specific article from a feed 
    // index start at last article
    router.get('/:feedId/:index', async (req, res) => {
        const { feedId, index } = req.params;
        
        try {
            const feedsCollection = db.collection<Feed>('feeds');
            const feed = await feedsCollection.findOne({ _id: new ObjectId(feedId) });

            if (!feed?.url) {
                return res.status(404).json({ message: 'Feed not found' });
            }

            const parsedFeed = JSON.parse(await parseRssFeed(feed.url));
            const articles = parsedFeed.rss.channel[0].item;

            const articleIndex = parseInt(index);
            if (articleIndex < 0 || articleIndex >= articles.length) {
                return res.status(404).json({ message: 'Article not found' });
            }

            const article = articles[articleIndex];
            res.json({
                _id: `${feed._id}-${articleIndex}`,
                title: article.title[0],
                link: article.link[0],
                pubDate: article.pubDate[0],
                description: article.description[0]
            });
        } catch (error) {
            console.error('Error in article route:', error);
            res.status(500).json({ 
                message: 'Internal server error', 
                error: error instanceof Error ? error.message : 'Unknown error' 
            });
        }
    });

    return router;
}