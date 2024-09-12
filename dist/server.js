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
(0, database_1.connectToDatabase)(ATLAS_URI)
    .then((db) => {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use('/feeds', feed_routes_1.feedRouter);
    app.use('/users', user_routes_1.userRouter);
    app.use('/user-feeds', user_feed_router_1.userFeedRouter);
    app.use('/articles', (0, article_routes_1.default)(db));
    app.listen(5200, () => console.log('Server running'));
})
    .catch(console.error);
