import { Router } from "express";
import { ProductManager } from "../dao/manager/productManager.js";
import { __dirname } from "../utils.js";
import path from "path";
import { productsModel } from "../dao/models/products.model.js";
import { ProductsMongo } from "../dao/manager/mongo/productsMongo.js";
import { ProductsController } from "../controllers/products.controllers.js";
import { productsDao } from "../dao/index.js";
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


router.post("/", ProductsController.postProduct);


router.put("/:pid", ProductsController.putProduct);

router.delete("/:pid", ProductsController.delProduct);


export {router as productsRouter};