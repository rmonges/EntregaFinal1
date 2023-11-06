import { Router } from "express";
import { ProductManager } from "../dao/manager/productManager.js";
import { __dirname } from "../utils.js";
import path from "path";
import { productsModel } from "../dao/models/products.model.js";
import { ProductsMongo } from "../dao/manager/mongo/productsMongo.js";
import { ProductsController } from "../controllers/products.controllers.js";
import { productsDao } from "../dao/factory.js";
import { checkRole, checkUserAutentificated } from "../middlerwares/auth.js";
//const productsDao = new ProductManager('products.json')
const router = Router();



const validation = (req, res, next)=>{
    const productInfo= req.body;
    if(!productInfo.tittle ||!productInfo.description ||!productInfo.code ||!productInfo.price||!productInfo.status||!productInfo.stock||!productInfo.category||!productInfo.thumbnail){
     return res.json({status: "error", message:"campos incompletos"});
}else{
    next();
   };  
};
//MONGO

router.get("/", ProductsController.getProducts);

router.get("/:pid", ProductsController.getpid );

router.get("/", async(req, res)=>{
    try {
        const limit= req.query.limit;
        const products = await productsDao.getProduct();
      
        if(limit>0){
            const limits = products.filter(product =>product.id<=limit)
            console.log("valor limit", limit)
            console.log("limits encontrados:", limits)
            res.json({status:"products limit", data:limits})
        }else{
            res.json({status:"products all", data:products})
        }
        
    } catch (error) {
        res.json({status:"error", message:error.message})
    }
   
})


router.get("/:prodid", ProductsController.getProdid)


router.post("/", checkUserAutentificated, checkRole(["admin", "superadmin", "premium"]),  ProductsController.createProduct);


router.put("/:pid", checkUserAutentificated,  checkRole(["admin"]), ProductsController.putProduct);

router.delete("/:pid",checkUserAutentificated, checkRole(["admin"]), ProductsController.delProduct);

router.get("/", async(req, res)=>{
    try {
        const products = await productsDao.get();//consta
        res.json({status:"success", data: products});
    } catch (error) {
        res.json({status:"error", error:error.message})
    }
})



export {router as productsRouter};