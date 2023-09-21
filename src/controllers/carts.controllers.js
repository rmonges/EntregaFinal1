
import { productsModel } from "../dao/models/products.model.js";
import { CartsMongo } from "../dao/manager/mongo/carts.Mongo.js";
import { productsDao } from "../dao/index.js";
import { ProductsService } from "../services/products.services.js"
import { CartsService } from "../services/carts.services.js";
import { cartsModel } from "../dao/models/carts.model.js";

export const cartsService = new CartsMongo ("carts.json");

export class CartsController {
    static cartCreated = async (req, res)=>{
        try {
            const newCart = req.body;
            const cartCreated = await CartsService.cartCreated(newCart);
            res.json({status:"success", data:cartCreated});
        } catch (error) {
            console.log(error.menssage)
            res.json({status:"error", message:"hubo un error al obtener los carritos"})
        }
    }
    static cartCreatedFind =  async (req, res)=>{
        try {
           const cartCreated = await CartsService.cartCreatedFind;
           res.json({status: "succes", data:cartCreated}); 
           
        } catch (error) {
           res.json({status:"error", message:error.message});
        };
   }
   static getCarts = async(req,res)=>{
    try {
        res.send(await CartsService.getCarts());
    } catch (error) {
        res.json({status:"error", message:error.message});
    };
 }
 static prodPopulateCid = async (req, res)=>{
    try {
        const cartId =(req.params.cid);
        const cart = await cartsModel.findById(cartId).populate("products");
        if(!cart){
            return res.send("este curso no existe")
        }
        console.log("CARRRT", cart);
        res.send(cart);
       
   }catch (error) {
        res.json({status:"error", message:error.message});
    };
  }
  static cartporCid = async (req, res)=>{
    try {
        const cartId =(req.params.cid);
        const cart = await CartsService.cartporCid(cartId);
        console.log("CARRRT", cart)
        res.json({status:"success", data:cart});
       
   }catch (error) {
        res.json({status:"error", message:error.message});
    };
 }
 static cidProductPid = async (req, res)=>{
    try {
         const cartId = (req.params.cid);
          const productId =(req.params.pid);
          const result = await CartsService.cidProductPid(cartId, productId);
          res.json({status:"success", data:result})
      }catch (error) {
       res.json({status:"error", message:error.message});
    };
 }
 static addproductCart = async(req, res)=>{
    try {
        const {productId, cartId }= req.body;//
        const cart = await CartsService.addproductCart(cartId);//me devuelve un json 
        if(!cartId){
            return res.status(404).json({ error: "Eeeeeeeeste carrito no existe" });
        };
        const product = await CartsService.addproductCart(productId);
        
        if(!productId){
            return res.status(404).json({ error: "Este producto no existe" });
        };
        cart.products.push(productId);
        
        console.log("producto encontado del carrito", product)
         cart.save();console.log("Producto encontrado del carrito:", product);
        console.log("Cart actualizado:", cart);
        res.send(cart);
        
      } catch (error) {
        res.json({status:"error", message:error.message});
    };
   }
   static deletecid = async (req, res)=>{
    try {
        const idDel= req.params.cid;
        await cartsModel.deleteOne({_id:idDel})
        res.json( {status:"succes", message:"cart eliminado correctamente "})
    
    }catch (error) {
        res.json({status:"error", message:"error"})
    };
  }
  static putporcid = async (req, res)=>{
    try {
        const cartId = req.params.cid;
        const cartInfo = req.body;
        const cartUpdate = await cartsService.putporcid(cartId, cartInfo);
        res.json({status:"succes", data : cartUpdate})
    } catch (error) {
        res.json({status:"error", message:"error"})
    }
   };
   static delteCidProductPid = async (req, res)=>{
    try {
        const cartId= req.params.cid;//
        const productId= req.params.pid;//

        const cart = await cartsModel.findById(cartId);//me devuelve un json 
        console.log("id carrito", cartId)
        if(!cartId){
             return res.send("este carrito no existe ")
        };
        console.log("id carrito", cartId)
        const product = await productsModel.findById(productId);
        console.log("id productoId", product)
        if(!productId){
            return res.send("este producto no existe");
            
        };
        cart.products.pull({_id:productId});
        
         cart.save();console.log("Producto eliminado del carrito:", cart);
        console.log("Cart eliminado:", cart);
        res.send(cart);

    }catch (error) {
        console.error(error);
        res.json({status:"error", message:"error"})
    };
  }
  static putCidProductPid = async (req, res)=>{
    try {
        const cartId= req.params.cid;//
        const productId= req.params.pid;//

        const cart = await cartsModel.findById(cartId);//me devuelve un json 
        console.log("id carrito", cartId)
        if(!cartId){
             return res.send("este carrito no existe ")
        };
        console.log("id carrito", cartId)
        const product = await productsModel.findById(productId);
        console.log("id productoId", product)
        if(!productId){
            return res.send("este producto no existe");
            
        };
        cart.products.pull({_id:productId});
        
        console.log("producto encontado del carrito", product)
         cart.save();console.log("Producto eliminado del carrito:", cart);
        console.log("Cart eliminado:", cart);
        res.send(cart);

    }catch (error) {
        console.error(error);
        res.json({status:"error", message:"error"})
    };
   }
   static deleteByCid = async (req, res)=>{
    try {
        const cartId= req.params.cid;//

        const cart = await CartsService.deleteByCid(cartId);//me devuelve un json 
        console.log("id carrito", cartId)
        if(!cartId){
             return res.send("este carrito no existe ")
        };
        console.log("id carrito", cartId)
        const deletedProducts = cart.filter(product=>product.cartId !== cartId)
    
        res.json({ message: `Se han eliminado ${deletedProducts.length} productos del carrito ${cartId}.` });
        console.log("id productoId", product)
        
       
        
        console.log("producto encontado del carrito", product)
         cart.save();console.log("Producto eliminado del carrito:", cart);
        console.log("Cart eliminado:", cart);
        res.send(cart);

    }catch (error) {
        console.error(error);
        res.json({status:"error", message:"error"})
    };
   };
   static deleteCidProducts = async (req, res) => {
    try {
        const cartId = req.params.cid;

        const cart = await CartsService.deleteCidProducts (cartId);
        if (!cart) {
            return res.send("Este carrito no existe");
        }
        cart.products = [];
        cart.save();
        console.log("Todos los productos eliminados del carrito:", cart);
        res.send(cart);
    } catch (error) {
        console.error(error);
        res.json({ status: "error", message: "error" });
    }
 };
}