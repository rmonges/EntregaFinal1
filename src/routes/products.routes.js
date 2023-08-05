import { Router } from "express";
import { ProductManager } from "../dao/manager/productManager.js";
import { __dirname } from "../utils.js";
import path from "path";
import { productsModel } from "../dao/models/products.model.js";
import { ProductsMongo } from "../dao/manager/mongo/productsMongo.js";

//const productService = new ProductManager('products.json')
const router = Router();

const productService = new ProductsMongo();

const validation = (req, res, next)=>{
    const productInfo= req.body;
    if(!productInfo.tittle ||!productInfo.description ||!productInfo.code ||!productInfo.price||!productInfo.status||!productInfo.stock||!productInfo.category||!productInfo.thumbnail){
     return res.json({status: "error", message:"campos incompletos"});
}else{
    next();
   };  
};
//MONGO
// router.get("/", async (req, res)=>{
//     try {
//         const products = await productsModel.find();
//         res.json({status:"success", data:products});
//     } catch (error) {
//         console.log(error.menssage)
//         res.json({status:"error", message:"hubo un error al obtener los productos"})
//     }
// })
// router.post("/", async (req, res)=>{
//     try {
//         const productCreated = await productsModel.create(req.body);
//         console.log("productCreated", productCreated)
//         res.json({status:"success", data:productCreated});
//     } catch (error) {
//         console.log(error.menssage)
//         res.json({status:"error", message:"hubo un error al obtener los productos"})
//     }
// })


router.get("/", async(req, res)=>{
    try {
        const limit= req.query.limit;
        const products = await productService.getProduct();
      
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


router.get("/:prodid",validation,async (req, res)=>{
    try {
        const id = Number(req.params.prodid);

        const products = await productService.getProduct();
        console.log("products", products)
        const productId = products.find((product) => product.id === id);
        console.log("productId", productId)

           productId

        res.json({status:"success", data: productId})
       
    }catch (error) {
        res.json({status:(404), message:error.message})
    }
})


router.post("/", async (req, res)=>{
    try {
        const productInfo = req.body;
        console.log("producInfo",productInfo);
        const products = await productService.addProduct(productInfo);
        res.json({status:"success post", data:products, message:"producto creado"})
       
   }catch (error) {
        res.json({status:"error", message:error.message})
        }
})


router.put("/:pid", async (req, res)=>{
    try {
        let pid = (req.params.pid);
        let upDateProduct = req.body;
        console.log("pid",pid," product", upDateProduct)
        res.send ( await productService.upDateProduct(pid, upDateProduct))     
    }catch (error) {
        res.status(404).json({status:"error", message:"El producto con el id no existe"})       
    };
});

router.delete("/:pid", async (req, res)=>{
    try {
        const idDel= req.params.pid;
        await productsModel.deleteOne({_id:idDel})
        res.json( {status:"succes", message:"producto eliminado correctamente "})
    
    }catch (error) {
        res.json({status:"error", message:"error"})
    };
    
});

export {router as productsRouter};