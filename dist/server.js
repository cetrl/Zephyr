"use strict";
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
app.use('/feeds', feed_routes_1.feedRouter);
app.use('/users', user_routes_1.userRouter);
app.use('/user-feeds', user_feed_router_1.userFeedRouter);
// We'll connect to the database and set up the articles route when the app is initialized
let dbConnection = null;
(0, database_1.connectToDatabase)(ATLAS_URI)
    .then((db) => {
    dbConnection = db;
    app.use('/articles', (0, article_routes_1.default)(db));
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
exports.default = app;
