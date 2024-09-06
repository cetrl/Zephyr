import * as mongodb from "mongodb";
import { Feed } from "./feed";

export const collections: {
    feeds?: mongodb.Collection<Feed>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("zephyr");
    await applySchemaValidation(db);

    const feedsCollection = db.collection<Feed>("feeds");
    collections.feeds = feedsCollection;
}

//update existing collection w/ JSON schema validation
async function applySchemaValidation(db: mongodb.Db){
    const jsonSchema = {
        $jsonSchema: {
                bsonType:"object",
                required: ["name", "url"],
                additionalProperties:true,
                properties: {
                    _id: { bsonType: ['objectId', 'null'] },
                    name: {
                        bsonType:"string",
                        description: "'name' is required and is a string",
                    },
                    url: {
                        bsonType:"string",
                        description: "'url' is required and is a string",
                    },
                },
            },
        };
        
        //try applying modif to the collection, if it doesn't exist, create it
        await db.command({
            collMod:"feeds",
            validator: jsonSchema
        }).catch(async (error: mongodb.MongoServerError)=>{
            if (error.codeName === "NamespaceNotFound") {
                await db.createCollection("feeds", {validator: jsonSchema});
            }
        })
    };