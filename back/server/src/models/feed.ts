import * as mongodb from "mongodb";

export interface Feed {
    name: string;
    url: string;
    _id?: mongodb.ObjectId;
}