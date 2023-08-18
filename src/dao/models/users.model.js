import mongoose from "mongoose";

const userCollection = "user";

const userSchema = new mongoose.Schema({
    first_name:{
        tipe:String,
        require:true
    },
    
})