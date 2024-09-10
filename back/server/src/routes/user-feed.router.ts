import express from "express";
import { ObjectId } from "mongodb";
import { collections } from "../database";

export const userFeedRouter = express.Router();
userFeedRouter.use(express.json());

// Follow a feed
userFeedRouter.post("/:userId/follow/:feedId", async (req, res) => {
    // 
});

// Unfollow a feed
userFeedRouter.delete("/:userId/unfollow/:feedId", async (req, res) => {
    // 
});

// Get user's followed feeds
userFeedRouter.get("/:userId/feeds", async (req, res) => {
    // 
});