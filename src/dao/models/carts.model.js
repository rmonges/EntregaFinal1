import mongoose from "mongoose";
import { cartsCollection, productsCollection } from "../../constants/index.js";



const cartsSchema = new mongoose.Schema({

       
    products:{
        
        type:[//tipo array
        
           {quantity:{type:Number, default:1},      
          
            productId:{//cada elemento es de tipo objeto, y contiene el id de un documento que pertenece a la coleccion "students"
                type:mongoose.Types.ObjectId,
                ref:productsCollection
            }     
        }  
        ],
        default:[]
    }

});

export const cartsModel = mongoose.model(cartsCollection, cartsSchema);