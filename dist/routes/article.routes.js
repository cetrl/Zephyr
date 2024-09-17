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
    router.get('/:feedId/:index', (req, res) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        const { feedId, index } = req.params;
        try {
            if (!mongodb_1.ObjectId.isValid(feedId)) {
                return res.status(400).json({ message: 'Invalid feed ID' });
            }
            const feedsCollection = db.collection('feeds');
            const feed = yield feedsCollection.findOne({ _id: new mongodb_1.ObjectId(feedId) });
            if (!(feed === null || feed === void 0 ? void 0 : feed.url)) {
                return res.status(404).json({ message: 'Feed not found' });
            }
            const parsedFeed = yield (0, rss_parser_1.parseRssFeed)(feed.url).then(JSON.parse).catch(() => null);
            if (!((_c = (_b = (_a = parsedFeed === null || parsedFeed === void 0 ? void 0 : parsedFeed.rss) === null || _a === void 0 ? void 0 : _a.channel) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.item)) {
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
                title: (_e = (_d = article.title) === null || _d === void 0 ? void 0 : _d[0]) !== null && _e !== void 0 ? _e : 'No title',
                link: (_g = (_f = article.link) === null || _f === void 0 ? void 0 : _f[0]) !== null && _g !== void 0 ? _g : 'No link',
                pubDate: (_j = (_h = article.pubDate) === null || _h === void 0 ? void 0 : _h[0]) !== null && _j !== void 0 ? _j : 'No date',
                description: (_l = (_k = article.description) === null || _k === void 0 ? void 0 : _k[0]) !== null && _l !== void 0 ? _l : 'No description',
                creator: (_o = (_m = article['dc:creator']) === null || _m === void 0 ? void 0 : _m[0]) !== null && _o !== void 0 ? _o : 'Unknown creator'
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
