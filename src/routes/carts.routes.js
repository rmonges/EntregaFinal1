import { Router } from "express";
import { CartsManager } from "../dao/manager/fileSystem/cartsFiles.js";
import { ProductManager} from "../dao/manager/productManager.js";
import { cartsModel } from "../dao/models/carts.model.js";
import { productsModel } from "../dao/models/products.model.js";

const cartsService = new CartsManager ("carts.json");
const productsService = new ProductManager ('../src/products.json') 
const router = Router();

//mogoose
router.get("/", async (req, res)=>{
try {
    const cart = await cartsModel.find();
        res.json({status:"successcart", data:cart});
} catch (error) {
    console.log(error.menssage)
    res.json({status:"error", message:"hubo un error al obtener los carts"})
}
});

router.post("/cartCreated", async (req, res)=>{
    try {
        const cartCreated = await cartsModel.create(req.body);
        console.log("cartCreated", cartCreated)
        res.json({status:"success", data:cartCreated});
    } catch (error) {
        console.log(error.menssage)
        res.json({status:"error", message:"hubo un error al obtener los carritos"})
    }
})

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
        const cartId =(req.params.cid);
        const cart = await cartsModel.findById(cartId);
        console.log("CARRRT", cart)
        res.json({status:"success", data:cart});
       
   }catch (error) {
        res.json({status:"error", message:error.message});
    };
});



router.post("/:cid/product/:pid", async (req, res)=>{
   try {
        const cartId = (req.params.cid);
         const productId =(req.params.pid);
         console.log("cartid y productid", cartId, productId)
        const result = await cartsService.addProductInCart(cartId, productId);
        console.log("cid y pid", result)
         res.json({status:"success", data:result})
     }catch (error) {
      res.json({status:"error", message:error.message});
   };
});  

router.put("/addproductCart", async(req, res)=>{
    try {
        const {productId, cartId }= req.body;//
        const cart = await cartsModel.findById(cartId);//me devuelve un json 
        if(!cartId){
             return res.send("este carrito no existe ")
        };
        const product = await productsModel.findById(productId);
        
        if(!productId){
            return res.send("este producto no existe");
        };
        cart.products.push(productId);
        
        console.log("producto encontado del carrito", product)
        await cart.save();
        console.log("cart", cart)
        res.send(cart);


        /////SEGUIRRRR
        
    } catch (error) {
        res.json({status:"error", message:error.message});
    };
});

router.delete("/:cid", async (req, res)=>{
    try {
        const idDel= req.params.cid;
        await cartsModel.deleteOne({_id:idDel})
        res.json( {status:"succes", message:"cart eliminado correctamente "})
    
    }catch (error) {
        res.json({status:"error", message:"error"})
    };
    
});

export {router as cartsRouter};