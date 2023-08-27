import mongoose from "mongoose";

const usersCollection = "users";

const userSchema = new mongoose.Schema({
    first_name:{
        type:String,
        
    },

    last_name:{
        type:String
    },

    email:{
        type:String,
        require:true,
        unique:true
    },
    age:{
        type:Number,
    },
    password:{
        type:String,
        require:true
    }
});

export const userModel =  mongoose.model(usersCollection, userSchema);