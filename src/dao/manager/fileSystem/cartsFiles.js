import { __dirname } from "../../../utils/utils.js";
import path from "path";
//import { CartManager } from "../dao/CartManager.js"   
import fs from "fs";  
import { ProductManager } from "../productManager.js";  
import { productsDao } from "../../factory.js"



  
export class CartsManager {
    constructor(fileName){
        this.path=path.join( __dirname,`/files/${fileName}`);
        this.carts = [];
    }


fileExist(){
  return  fs.existsSync(this.path) //chequeo si existe un archivo, devuelve true o false
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
          try {
               if(this.fileExist()){
                      const contenido = await fs.promises.readFile(this.path, "utf-8");
                      const cartJson = JSON.parse(contenido);
                      return cartJson;                    
                }else{
                      return console.log("no hay achivos")
                    }
          }catch (error) {
              console.error(error.message);
              return undefined;
          };
      };    
      
  exist = async (id) => {
      let carts = await this.loadCarts();
      return carts.find((p)=>p.id === id);
  }


async addCart(){
  try {
       if(this.fileExist()){
          const info = await fs.promises.readFile(this.path, "utf-8")
          const carts =  JSON.parse(info);
          console.log("productJSON", carts);
          let newId;
        if(carts.length===0){
              newId=1;
              console.log("primer carrito !!!!!!!!!!");

      }else{
            newId=carts[carts.length -1].id+1;
            carts.id= newId;
            };
      
            const newCart ={
              id:newId,
              products:[]
         };
          carts.push(newCart);
      
           await fs.promises.writeFile(this.path, JSON.stringify(carts, null,'\t'));//lo primero es lo que quiero convertir a json
           return newCart;
     }

  } 
  catch (error) {
      console.error(error.message);
  };
};


  async getById(id){
    try {
       
        if(this.fileExist()){
            const carts = await this.getAll()
            const cartIds = carts.find(p => p.id === id)
            console.log("cartsbyid",cartIds)
            return cartIds;     
        }else{
             console.error("Result Cart seach byId : Dont Found");
           };
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

async addProductInCart(cartId, productId){
   try {   
    
       let cartById = await this.exist(cartId);
       if(!cartById) return "carrito no encontrado";
       console.log("productId", productId)
       let productById = await productsDao.exist(productId);
       console.log("cartById:", cartById)
       console.log("productById:", productById)
       if(!productById) return "producto no encontrado";

       let cartAll = await this.getAll();
       let cartFilter = cartAll.filter( (c) => c.id !=cartId);
       console.log("cartFilter",cartFilter)

       if( cartById.products.some((prod)=>prod.id===productId)){
       
        let productInCart = cartById.products.find((prod)=>prod.id===productId);
       // console.log("productInCart",productInCart)
        productInCart.cantidad +=1;
        //  console.log("productInCart",productInCart)
        let cartConcat = [cartById, ...cartFilter];
        console.log("cartConcat",cartConcat)
        await fs.promises.writeFile(this.path, JSON.stringify(cartConcat, null,'\t'));
        return "producto existente sumado al carrito"
       };
          
        await cartById.products.push({id:productById.id, cantidad:1})

        let cartsConcat = [cartById, ...cartFilter]; //suumo el carrito filtrado
        await fs.promises.writeFile(this.path, JSON.stringify(cartsConcat, null,'\t')); 
        return "producto agregado al carrito";
           
          
       } catch (error) {
      console.error(error.message);
    };
   };
};



