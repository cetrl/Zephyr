import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "../database";

export const articleRouter = express.Router();
articleRouter.use(express.json());

articleRouter.get("/", async (_req, res) => {
    try {
        const articles = await collections?.articles?.find({}).toArray();
        res.status(200).send(articles);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

articleRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const article = await collections?.articles?.findOne(query);

        if (article) {
            res.status(200).send(article);
        } else {
            res.status(404).send(`Failed to find a article: ID ${id}`);
        }
    } catch (error) {
        res.status(404).end(`Failed to find article: ID ${req?.params?.id}`);
    }
});