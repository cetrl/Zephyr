import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "../database";
import { parseRssFeed } from '../services/rss-parser';

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

feedRouter.get("/fetch/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const feed = await collections?.feeds?.findOne({ _id: new ObjectId(id) });
      console.log('Feed found:', feed);
      if (feed && feed.url) {
        console.log('Attempting to parse feed:', feed.url);
        const parsedFeed = JSON.parse(await parseRssFeed(feed.url));
        console.log('Parsed feed:', JSON.stringify(parsedFeed, null, 2));
      } else {
        res.status(404).send('Feed not found');
      }
    } catch (error) {
      console.error('Error fetching feed:', error);
      res.status(500).send(`Error fetching feed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

feedRouter.post("/", async (req, res) => {
    try {
        const feed =req.body;
        const result = await collections?.feeds?.insertOne(feed);

        if (result?.acknowledged) {
            res.status(201).send(`Created a new feed: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new feed.");
        }
    } catch(error) {
        console.error(error);
        res.status(400).send(error instanceof Error ? error.message : "Unknow error");
    }
});

feedRouter.put("/:id", async (req, res) =>{
    try {
        const id = req?.params?.id;
        const feed = req.body;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.feeds?.updateOne(query, {$set: feed });
    
        if ( result && result.matchedCount) {
            res.status(200).send(`Updated a feed: ID ${id}.`);
        } else if (!result?.matchedCount) {
            res.status(404).send(`Failed to find an feed: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update an feed: ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});

feedRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.feeds?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed an feed: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove an feed: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find an feed: ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});