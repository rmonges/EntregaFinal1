import { __dirname } from "../../../utils.js";
import path from "path";
//import { CartManager } from "../dao/CartManager.js"   
import fs from "fs";  
import { ProductManager } from "../productManager.js";  
import { cartsModel } from "../../models/carts.model.js";
import {productsModel} from "../../models/products.model.js";

export class productsModel{
    constructor(){
        this.modelp =productsModel;
    }
}
 
export class CartsMongo {
    constructor(){
        this.model = cartsModel;
        
    };



async saveCart() {
     try {
          await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2));
     }catch (error) {
             console.error('Error saving products:', error);
          };
      };  
      
      
async loadCarts() {
        try{
            const data = await fs.promises.readFile(this.path, 'utf8');
            if (data) {
                this.carts = JSON.parse(data);
            } else {
                throw new Error("No es posible obtener los productos!");
            }
          
            return this.carts;
        }catch (error) {
            console.error('Error loading products:', error);
            return [];
        };
     };
         
        
async getAll(){
    try{
        const carts = await this.model.find().lean();
        return carts;
    }catch(error){
        console.log(error.message);
        // throw error
        throw new Error("Hubo un error al obtener los ");
    }
      };    
      
  exist = async (id) => {
      let carts = await this.loadCarts();
      return carts.find((p)=>p.id === id);
  }


async addCart(products){
  try {
    //    if(this.fileExist()){
    //       const info = await fs.promises.readFile(this.path, "utf-8")
    //       const carts =  JSON.parse(info);
    //       console.log("productJSON", carts);
    //       let newId;
    //     if(carts.length===0){
    //           newId=1;
    //           console.log("primer carrito !!!!!!!!!!");

    //   }else{
    //         newId=carts[carts.length -1].id+1;
    //         carts.id= newId;
    //         };
      
    //         const newCart ={
    //           id:newId,
    //           products:[]
    //      };
    //       carts.push(newCart);
      
    //        await fs.promises.writeFile(this.path, JSON.stringify(carts, null,'\t'));//lo primero es lo que quiero convertir a json
    //        return newCart;
    // }
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
       
             const carts = await this.model.findById(id)
            
            //console.log("cartsbyid",carts)
             return carts;     
        
        }
    catch (error) {
        console.error(error.message);
        return undefined;
    }
};


async deleteCars(id){
  try {
      const carts = await this.getAll();
   let existenProducts = carts.some(cart => cart.id === id);
 }catch (error) {
      console.error(error.message);
     }
};


  async addProductInCart (cid, obj) {
    console.log("cid  pid", cid, obj )
    try {
        const filter = { _id: cid, "products._id": obj._id };
        console.log("filter", filter)
        const cart = await this.model.findById(cid);
        console.log("cart", cart)
        const findProduct = cart.products.some((product) => product._id.toString() === obj._id);

        if (findProduct) {
            const update = { $inc: { "products.$.quantity": obj.quantity } };
            await this.model.updateOne(filter, update);
        } else {
            const update = { $push: { products: { _id: obj._id, quantity: obj.quantity } } };
            await this.model.updateOne({ _id: cid }, update);
        }

        return await this.model.findById(cid);
    } catch (err) {
        console.error('Error al agregar el producto al carrito:', err.message);
        return err;
    }
};

};


