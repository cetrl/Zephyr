import * as mongodb from "mongodb";

export interface Feeds {
    name: string;
    url: string;
    _id?: mongodb.ObjectId;
}