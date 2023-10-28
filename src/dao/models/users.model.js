import mongoose from "mongoose";

const usersCollection = "users";

const userSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
  

    last_name:{
        type:String
    },

    email:{
        type:String,
        require:true,
        unique:true
    },
    age:Number,
    
    password:{
        type: String,
        required:true
    },
    cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"carts"
    },
    role:{
        type:String,
        required:true,
       enum:["user", "admin"],
        default:"user" 
    }

});

export const userModel =  mongoose.model(usersCollection, userSchema);