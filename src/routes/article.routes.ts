import express from 'express';
import { ObjectId, Db } from 'mongodb';
import { Feed } from '../models/feed';
import { parseRssFeed } from '../services/rss-parser';

export default function(db: Db) {
    const router = express.Router();

    router.get('/:feedId/:index', async (req, res) => {
        const { feedId, index } = req.params;
        
        try {
            if (!ObjectId.isValid(feedId)) {
                return res.status(400).json({ message: 'Invalid feed ID' });
            }

            const feedsCollection = db.collection<Feed>('feeds');
            const feed = await feedsCollection.findOne({ _id: new ObjectId(feedId) });

            if (!feed?.url) {
                return res.status(404).json({ message: 'Feed not found' });
            }

            const parsedFeed = await parseRssFeed(feed.url).then(JSON.parse).catch(() => null);
            if (!parsedFeed?.rss?.channel?.[0]?.item) {
                return res.status(500).json({ message: 'Failed to parse feed' });
            }

            const articles = parsedFeed.rss.channel[0].item;
            const articleIndex = parseInt(index, 10);
            if (isNaN(articleIndex) || articleIndex < 0 || articleIndex >= articles.length) {
                return res.status(404).json({ message: 'Article not found' });
            }

            const article = articles[articleIndex];
            res.json({
                _id: `${feed._id}-${articleIndex}`,
                title: article.title?.[0] ?? 'No title',
                link: article.link?.[0] ?? 'No link',
                pubDate: article.pubDate?.[0] ?? 'No date',
                description: article.description?.[0] ?? 'No description'
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