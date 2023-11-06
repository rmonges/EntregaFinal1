import mongoose from "mongoose";
import { productsModel } from "../dao/models/products.model.js";
import { config } from "../config/config.js";


const upDateProducts = async ()=>{
    try {
        await mongoose.connect(config.mongo.url);
        console.log("base de datos conectada");
        const adminId = "65444e13cdceddf3d4586a9b";
        const result = await productsModel.updateMany({}, {$set:{owner:adminId}});
        console.log(result);
    } catch (error) {
        console.log(error);
      }finally{
        await mongoose.connection.close();
      }
}; 
 upDateProducts();