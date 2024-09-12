"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const rss_parser_1 = require("../services/rss-parser");
function default_1(db) {
    const router = express_1.default.Router();
    // route retrieving a specific article from a feed 
    // index start at last article
    router.get('/:feedId/:index', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { feedId, index } = req.params;
        try {
            const feedsCollection = db.collection('feeds');
            const feed = yield feedsCollection.findOne({ _id: new mongodb_1.ObjectId(feedId) });
            if (!(feed === null || feed === void 0 ? void 0 : feed.url)) {
                return res.status(404).json({ message: 'Feed not found' });
            }
            const parsedFeed = JSON.parse(yield (0, rss_parser_1.parseRssFeed)(feed.url));
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
        }
        catch (error) {
            console.error('Error in article route:', error);
            res.status(500).json({
                message: 'Internal server error',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }));
    return router;
}
