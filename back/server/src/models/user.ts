import * as mongodb from "mongodb";

export interface User {
    mail: string;
    password: string;
    name: string;
    _id?: mongodb.ObjectId;
}