import { ProductsService } from "../services/products.services.js";
import { productsDao } from "../dao/factory.js";
import { productsModel } from "../dao/models/products.model.js";
import { cartsService } from "./carts.controllers.js";

export class ProductsController{
     static getProducts = async (req, res)=>{
        try {
            const products = await ProductsService.getProducts();
            res.json({status:"success", data:products});
        } catch (error) {
            console.log(error.menssage)
            res.json({status:"error", message:"hubo un error al obtener los productos"})
        }
    }
     static getpid = async (req, res)=>{
        try {
            const pid = (req.params.pid);
            const product = await ProductsService.getpid(pid)
            res.json ( {status:"success", data:product})     
        }catch (error) {
            res.status(404).json({status:"error", message:"El producto con el id no existe"})       
        };
    }
    static getProdid = async (req, res)=>{
        try {
            const id = Number(req.params.prodid);
    
            const products = await ProductsService.getProducts();
            console.log("products", products)
            const productId = products.find((product) => product.id === id);
            console.log("productId", productId)
    
               productId
    
            res.json({status:"success", data: productId})
           
        }catch (error) {
            res.json({status:(404), message:error.message})
        }
    }
    static createProduct = async (req, res)=>{
        try {
            const productInfo = req.body;
            
            const products = await ProductsService.createProduct(productInfo);
            res.json({status:"success post", data:products, message:"producto creado"})
            
       }catch (error) {
            res.json({status:"error", message:error.message})
            }
    }
    static putProduct = async (req, res)=>{
        try {
            let pid = (req.params.pid);
            let upDateProduct = req.body;
            res.send ( await ProductsService.putProduct(pid, upDateProduct))     
        }catch (error) {
            res.status(404).json({status:"error", message:"El producto con el id no existe"})       
        };
    }
    static delProduct = async (req, res)=>{
        try {
            const idDel= req.params.pid;
            await ProductsService.delProduct({_id:idDel})
            res.json( {status:"succes", message:"producto eliminado correctamente "})
        
        }catch (error) {
            res.json({status:"error", message:"error"})
        };
        
    }
    
}