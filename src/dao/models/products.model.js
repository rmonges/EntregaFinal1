import mongoose from "mongoose";
import { productsCollection } from "../../constants/index.js";
import mogoosePaginate from "mongoose-paginate-v2"

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
      default:0,
      },
      category:{
        type:String,
        enum:["sandwitch,papas, empanadas, pizza, mediana, grande, chica"],
       required:true,
      
      },
      thumbnail:{
        type:String,
      required:true
      },
      
});
productsSchema.plugin(mogoosePaginate)

export const productsModel = mongoose.model(productsCollection, productsSchema);

