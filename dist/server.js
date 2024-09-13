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
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./database");
const feed_routes_1 = require("./routes/feed.routes");
const article_routes_1 = __importDefault(require("./routes/article.routes"));
const user_routes_1 = require("./routes/user.routes");
const user_feed_router_1 = require("./routes/user-feed.router");
(0, dotenv_1.config)();
const { ATLAS_URI } = process.env;
if (!ATLAS_URI) {
    console.error('No ATLAS_URI environment variable has been defined in config.env');
    process.exit(1);
}
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
let dbConnection = null;
const ensureDbConnection = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!dbConnection) {
        try {
            dbConnection = yield (0, database_1.connectToDatabase)(ATLAS_URI);
            console.log('Connected to MongoDB');
        }
        catch (error) {
            console.error('Failed to connect to MongoDB', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    next();
});
app.use(ensureDbConnection);
app.use('/api/feeds', feed_routes_1.feedRouter);
app.use('/api/users', user_routes_1.userRouter);
app.use('/api/user-feeds', user_feed_router_1.userFeedRouter);
app.use('/api/articles', (req, res, next) => {
    if (dbConnection) {
        (0, article_routes_1.default)(dbConnection)(req, res, next);
    }
    else {
        res.status(500).json({ error: 'Database connection not established' });
    }
});
// catch-all routes for debug
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Route not found: ${req.method} ${req.originalUrl}`,
        availableRoutes: ['/api/feeds', '/api/users', '/api/user-feeds', '/api/articles']
    });
});
//test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working' });
});
// Health check route
app.get('/api/health', (req, res) => {
    res.status(200).send('OK');
});
if (process.env.VERCEL !== '1') {
    const PORT = process.env.PORT || 5200;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
exports.default = app;
