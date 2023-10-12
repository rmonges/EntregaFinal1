import { __dirname } from "../../../utils.js";
import path from "path";
//import { CartManager } from "../dao/CartManager.js"   
import fs from "fs";  
import { ProductManager } from "../productManager.js";  
import { cartsModel } from "../../models/carts.model.js";
//import {productsModel} from "../../models/products.model.js";
import { throws } from "assert";

export class productsModel{
    constructor(){
        this.modelp = productsModel;
    }
}
 
export class CartsMongo {
    constructor(){
        this.model = cartsModel;
        
    };



async saveCart(cart) {
     try {
          const cartCreated = await this.model.create(cart)
    
          return cartCreated;
          }
          catch (error) {
            throw error;
        };
      };  
               
        
async getAll(){
    try{
        const carts = await this.model.find().lean();
        return carts;
    }catch(error){
        console.log(error.message);
        throw new Error("Hubo un error al obtener los ");
    }
      };    
      
  exist = async (id) => {
      let carts = await this.loadCarts();
      return carts.find((p)=>p.id === id);
  }


async addCart(products){
  try {
    let cartData = {};
    if(products && products.lenght > 0){
        cartData.products =products;
    }
     const cart = await this.model.create(cartData);
    return cart;

  } 
  catch (error) {
      console.error(error.message);
  };
};


  async getById(id){
    try {
            const cart = await this.model.findById(id).populate("products");
            if(!cart){
                throw new Error ("el carrito no esta registrado");     
            }
             return cart;     
        }
    catch (error) {
        console.error(error.message);
        return undefined ;
    }
};


async deleteCart(id) {
    try {
        const cart = await this.model.find(id);
        if(cart){
           await this.model.findOneAndDelete({id});
        }
         return "carrito eliminado"; 
   } catch (err) {
        console.error("Error al eliminar el producto:", err);
    }
}


//   async addProductInCart (cid, obj) {
//     console.log("cid  pid", cid, obj )
//     try {
//         const filter = { _id: cid, "products._id": obj._id };
//         console.log("filter", filter)
//         const cart = await this.model.findById(cid);
//         console.log("cart", cart)

//         if(!cart){
//             console.error('Carrito no encontrado');
//             return null;
//         }
//         const findProduct = cart.products.some((product) => product._id.toString() === obj._id);

//         if (findProduct) {
//             const update = { $inc: { "products.$.quantity": obj.quantity } };
//             await this.model.updateOne(filter, update);
//         } else {
//             const update = { $push: { products: { _id: obj._id, quantity: obj.quantity } } };
//             await this.model.updateOne({ _id: cid }, update);
//         }

//         return await this.model.findById(cid);
//     } catch (err) {
//         console.error('Error al agregar el producto al carrito:', err.message);
//         return err;
//     }
// };

   async upDateCart (cartId, cartInfo){
    try {
        const cartUpDate = await this.model.findByIdAndUpdate(cartId, cartInfo , 
        {new:true} ); 
        if(!cartUpDate){
            throw new Error ("carrito no encontrado");
          } 
        return cartUpDate;
    } catch (error) {
        throw error; 
    }
   }

};


