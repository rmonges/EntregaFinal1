import { Router } from "express";
import { CartsManager } from "../dao/cartsManager.js";
import { ProductManager} from "../productManager.js";

const cartsService = new CartsManager ("carts.json");
const productsService = new ProductManager ('../src/products.json') 
const router = Router();


router.post("/", async (req, res)=>{
     try {
        const cartCreated = await cartsService.addCart();
        res.json({status: "succes", data:cartCreated}); 
        
     } catch (error) {
        res.json({status:"error", message:error.message});
     };
});

router.get("/", async(req,res)=>{
   try {
       res.send(await cartsService.getAll());
   } catch (error) {
       res.json({status:"error", message:error.message});
   };
});


router.get("/:cid", async (req, res)=>{
    try {
        const cartId =parseInt(req.params.cid);
        const cart = await cartsService.getById(cartId);
        res.json({status:"success", data:cart})
       
   }catch (error) {
        res.json({status:"error", message:error.message});s
    };
});


router.post("/:cid/product/:pid", async (req, res)=>{
   try {
        const cartId = parseInt(req.params.cid);
         const productId = parseInt(req.params.pid);
        const result = await cartsService.addProductInCart(cartId, productId);
         res.json({status:"success", data:result})
     }catch (error) {
      res.json({status:"error", message:error.message});
   };
});  


export {router as cartsRouter};