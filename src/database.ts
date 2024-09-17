import { MongoClient, Db, Collection, MongoServerError } from "mongodb";
import { Feed } from "./models/feed";
import { User } from "./models/user";
import { Article } from "./models/article";

export const collections: {
    feeds?: Collection<Feed>;
    users?: Collection<User>;
    articles?: Collection<Article>;
} = {};

export async function connectToDatabase(uri: string): Promise<Db> {
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("zephyr");
    await applySchemaValidation(db);

    collections.feeds = db.collection<Feed>("feeds");
    collections.users = db.collection<User>("users");
    collections.articles = db.collection<Article>("articles");

    return db;
}


async function applySchemaValidation(db: Db) {
    await applyFeedSchema(db);
    await applyUserSchema(db);
    await applyArticleSchema(db);
}

async function applyFeedSchema(db: Db){
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
                    }
                }
        }
    }
    await createOrUpdateCollection(db, "feeds", jsonSchema);
}

async function applyUserSchema(db: Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["mail", "password", "name"],
            additionalProperties: true,
            properties: {
                _id: { bsonType: ['objectId', 'null'] },
                mail: {
                    bsonType: "string",
                    description: "'mail' is required and is a string",
                },
                password: {
                    bsonType: "string",
                    description: "'password' is required and is a string",
                },
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                },
            },
        },
    };

    await createOrUpdateCollection(db, "users", jsonSchema);
}

async function applyArticleSchema(db: Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["title", "description", "link", "pubDate", "feedId"],
            additionalProperties: true,
            properties: {
                _id: { bsonType: ['objectId', 'null'] },
                title: {
                    bsonType: "string",
                    description: "'title' is required and is a string",
                },
                description: {
                    bsonType: "string",
                    description: "'description' is required and is a string",
                },
                link: {
                    bsonType: "string",
                    description: "'link' is required and is a string",
                },
                pubDate: {
                    bsonType: "date",
                    description: "'pubDate' is required and is a date",
                },
                feedId: {
                    bsonType: "objectId",
                    description: "'feedId' is required and is an ObjectId",
                },
                creator: {
                    bsonType: "string",
                    description: "'creator' is optional and is a string",
                },
            },
        },
    };
    
    await createOrUpdateCollection(db, "articles", jsonSchema);
}

async function createOrUpdateCollection(db: Db, collectionName: string, jsonSchema: object) {
    await db.command({
        collMod: collectionName,
        validator: jsonSchema
    }).catch(async (error: MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection(collectionName, { validator: jsonSchema });
        }
    });
}