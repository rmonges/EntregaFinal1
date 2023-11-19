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
       enum:["user", "admin", "premium"],
        default:"user" 
    } ,
    documents:{
          type:[
            {
              name:{
                type:String,
                require:true
              },
              reference:{
                type:String,
                require:true
              }
            }
          ],
          default:[]
         },
        last_connection:{
            type: Date,
            default: null
         },
        status:{
          type:String,
          enums: ["pendiente", "incompleto", "completo"],
          default:"pendiente"
        },
        avatar:{
          type:String,
          required:true
        }  

});

export const userModel =  mongoose.model(usersCollection, userSchema);