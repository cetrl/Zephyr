import * as mongodb from "mongodb";
import { ObjectId } from "mongodb";

export interface User {
    mail: string;
    password: string;
    name: string;
    followedFeedIds: ObjectId[];
    _id?: mongodb.ObjectId;
}