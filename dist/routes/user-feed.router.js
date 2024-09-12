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
exports.userFeedRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.userFeedRouter = express_1.default.Router();
exports.userFeedRouter.use(express_1.default.json());
// Follow a feed
exports.userFeedRouter.post("/:userId/follow/:feedId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // 
}));
// Unfollow a feed
exports.userFeedRouter.delete("/:userId/unfollow/:feedId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // 
}));
// Get user's followed feeds
exports.userFeedRouter.get("/:userId/feeds", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // 
}));
