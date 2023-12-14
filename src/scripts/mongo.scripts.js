import mongoose from "mongoose";
import { productsModel } from "../dao/models/products.model.js";
import { config } from "../config/config.js";


const upDateProducts = async ()=>{
    try {
        await mongoose.connect(config.mongo.url);
        console.log("base de datos conectada");
        const adminId = "6576246c7e3a9a65a4103c64";
        const result = await productsModel.updateMany({},{$set:{owner:adminId}});
        console.log(result);
    } catch (error) {
        console.log(error);
      }finally{
        await mongoose.connection.close();
      }
}; 
 upDateProducts();