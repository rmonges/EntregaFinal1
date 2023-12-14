import { ProductsService } from "../services/products.services.js";
import { productsDao } from "../dao/factory.js";
import { productsModel } from "../dao/models/products.model.js";
import { cartsService } from "./carts.controllers.js";
import { transporter, adminEmail } from '../config/email.js';

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
            productInfo.owner = req.user._id;
            productInfo.thumbnail = req.file.filename;
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
            const productId= req.params.pid;
            const product = await ProductsService.getpid(productId);
            console.log("productdelProduct", product)
            console.log("roleuserdel", req.user.email)
            //validamos el usuario usuario premium y es el creador del producto puede borrar y si es admin tambien
            if((req.user.role === "premium" && product.owner.toString() === req.user._id.toString()) || (req.user.role ==="admin")){
               
               await ProductsService.delProduct(productId);
               if (req.user.role === 'premium') {
                const mailOptions = {
                  from: adminEmail,
                  to: req.user.email,
                  subject: 'Producto eliminado',
                  text: `El producto ${product.name} ha sido eliminado.`,
                };
      
                await transporter.sendMail(mailOptions);
              }
               res.json( {status:"succes", message:"producto eliminado correctamente"});
            }else{
                 return res.json( {status:"error", message:"no tienes permisos"}) 
            };
        }catch (error) {
            res.json({status:"errordelProduct", message:error.message})
        };
        
    }
    
}