import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "./database";

export const feedRouter = express.Router();
feedRouter.use(express.json());

feedRouter.get("/", async (_req, res) => {
    try {
        const feeds = await collections?.feeds?.find({}).toArray();
        res.status(200).send(feeds);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});