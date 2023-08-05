import mongoose from "mongoose";
import { productsCollection } from "../../constants/index.js";


const productsSchema = new mongoose.Schema({
       tittle:{
        type:String,
       required:true,
      },
      description:{
        type:String,
       required:true,
      },
      code:{
        type:Number,
       required:true,
       
      },
      price:{
        type:Number,
       required:true,
      },
      status:{
        type:String,
       required:true,
      },
      stock:{
        type:Number,
       required:true,
      },
      category:{
        type:String,
       required:true,
      
      },
      thumbnail:{
        type:String,
      required:true
      },
})

export const productsModel = mongoose.model(productsCollection, productsSchema);

