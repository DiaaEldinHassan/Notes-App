import mongoose from "mongoose";
import { db_uri } from "../../Config/config.service.js";
export async function dbConnect() {
    try {
        await mongoose.connect(db_uri);
        console.log("DB Connected Successfully 👌👌");
    } catch (error) {
        console.error(error.message);
    }    
}