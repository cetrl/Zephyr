"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.collections = void 0;
exports.connectToDatabase = connectToDatabase;
const mongodb = __importStar(require("mongodb"));
exports.collections = {};
function connectToDatabase(uri) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new mongodb.MongoClient(uri);
        yield client.connect();
        const db = client.db("zephyr");
        yield applySchemaValidation(db);
        exports.collections.feeds = db.collection("feeds");
        exports.collections.users = db.collection("users");
        exports.collections.articles = db.collection("articles");
        return client.db();
    });
}
function applySchemaValidation(db) {
    return __awaiter(this, void 0, void 0, function* () {
        yield applyFeedSchema(db);
        yield applyUserSchema(db);
        yield applyArticleSchema(db);
    });
}
;
function applyFeedSchema(db) {
    return __awaiter(this, void 0, void 0, function* () {
        const jsonSchema = {
            $jsonSchema: {
                bsonType: "object",
                required: ["name", "url"],
                additionalProperties: true,
                properties: {
                    _id: { bsonType: ['objectId', 'null'] },
                    name: {
                        bsonType: "string",
                        description: "'name' is required and is a string",
                    },
                    url: {
                        bsonType: "string",
                        description: "'url' is required and is a string",
                    }
                }
            }
        };
        yield createOrUpdateCollection(db, "feeds", jsonSchema);
    });
}
;
function applyUserSchema(db) {
    return __awaiter(this, void 0, void 0, function* () {
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
        yield createOrUpdateCollection(db, "users", jsonSchema);
    });
}
function applyArticleSchema(db) {
    return __awaiter(this, void 0, void 0, function* () {
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
                },
            },
        };
        yield createOrUpdateCollection(db, "articles", jsonSchema);
    });
}
function createOrUpdateCollection(db, collectionName, jsonSchema) {
    return __awaiter(this, void 0, void 0, function* () {
        yield db.command({
            collMod: collectionName,
            validator: jsonSchema
        }).catch((error) => __awaiter(this, void 0, void 0, function* () {
            if (error.codeName === "NamespaceNotFound") {
                yield db.createCollection(collectionName, { validator: jsonSchema });
            }
        }));
    });
}
