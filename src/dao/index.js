import { connectDB } from "../config/dbConnection.js";
import { UsersMongo } from "./manager/mongo/users.mongo.js";

connectDB();
export const userService = new UsersMongo();