import mongoose from "mongoose";
import {config} from "./config.js"

export const connectDB = async()=>{
    try {
        await mongoose.connect(config.mongo.url)
        console.log("base de datos conectada integrada")
    } catch (error) {
        console.log(`Error al conectar la base de datos ${error.message}`);
    }
}
    
