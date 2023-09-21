import { connectDB } from "../config/dbConnection.js";
import { ProductsMongo } from "./manager/mongo/productsMongo.js";
import { UsersMongo } from "./manager/mongo/users.mongo.js";

connectDB();
export const userDao = new UsersMongo();
export const productsDao = new ProductsMongo();