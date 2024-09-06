import * as dotenv from 'dotenv'; 
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./database";
import { feedRouter } from './routes/feed.routes';

dotenv.config();

const { ATLAS_URI } = process.env;

if(!ATLAS_URI) {
    console.error(
        "No ATLAS_URI environment variable has been defined in config.env"
    );
    process.exit(1);
}

connectToDatabase(ATLAS_URI)
    .then(() => {
        const app = express();
        app.use(cors());
        app.use("/feeds", feedRouter);

        //start the Express server
        app.listen(5200, () => {
            console.log(`Server running at http://localhost:5200`)
        });
    })
    .catch((error) => console.error(error));