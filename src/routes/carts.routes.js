import { Router } from "express";
import { CartsManager } from "../dao/manager/fileSystem/cartsFiles.js";
import { ProductManager} from "../dao/manager/productManager.js";
import { cartsModel } from "../dao/models/carts.model.js";
import { productsModel } from "../dao/models/products.model.js";
import { CartsMongo } from "../dao/manager/mongo/carts.Mongo.js";
import { productsCollection } from "../constants/index.js";
const cartsService = new CartsMongo ("carts.json");
const productsService = new ProductManager ('../src/products.json') 
const router = Router();


router.post("/cartCreated", async (req, res)=>{
    try {
        const newCart = req.body;
        const cartCreated = await cartsService.addCart(newCart);
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
//POST ADD PRODUCT CART
router.post("/", async (req, res)=>{
    try {
        const productDetails = req.body;
        const cartCreated = await cartsService.addCart(productDetails);
        console.log("cartCreated", cartCreated)
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

//obtener ruta con populacion
router.get("/prodpopulate/:cid", async (req, res)=>{
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
            return res.status(404).json({ error: "Eeeeeeeeste carrito no existe" });
        };
        const product = await productsModel.findById(productId);
        
        if(!productId){
            return res.status(404).json({ error: "Este producto no existe" });
        };
        cart.products.push(productId);
        
        console.log("producto encontado del carrito", product)
         cart.save();console.log("Producto encontrado del carrito:", product);
        console.log("Cart actualizado:", cart);
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
router.put("/:cid", async (req, res)=>{
    try {
        const cartId = req.params.cid;
        const cartInfo = req.body;
        const cartUpdate = await cartsService.upDateCart(cartId, cartInfo);
        res.json({status:"succes", data : cartUpdate})
    } catch (error) {
        res.json({status:"error", message:"error"})
    }
    
})

router.delete("/:cid/product/:pid", async (req, res)=>{
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
 });  
 router.put("/:cid/product/:pid", async (req, res)=>{
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
});  

router.delete("/:cid", async (req, res)=>{
    try {
        const cartId= req.params.cid;//

        const cart = await cartsModel.findById(cartId);//me devuelve un json 
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

});


router.delete("/:cid/products", async (req, res) => {
    try {
        const cartId = req.params.cid;

        const cart = await cartsModel.findById(cartId);
        console.log("id carrito", cartId);
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
});


export {router as cartsRouter};