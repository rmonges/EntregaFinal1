import { productsDao } from "../dao/factory.js"
import { ProductsMongo } from "../dao/manager/mongo/productsMongo.js";
import { productsModel } from "../dao/models/products.model.js";

export class ProductsService {
    static getProducts =  async ()=>{
        console.log('Before getProduct in getProducts'); 
    try{
        const products = await productsDao.getProduct();
         console.log('products:', products);
         return products; 
    } catch (error) {
        console.error('Error in getProducts:', error);
        throw error;
    }
    }; 
    static createProduct = async (productInfo)=>{
        return await productsDao.addProduct(productInfo);
    } 
    static getpid =  async (pid)=>{ 
        return await productsDao.getById(pid);
    };
    static putProduct = async (pid, upDateProduct)=>{
        return await productsDao.upDateProduct(pid, upDateProduct);
    };
    static delProduct = async (productId)=>{
        return await productsDao.deleteProduct(productId);
    }
    static  obtenerProductosDelCarrito = async (ids) => {
        try {
          const arrayIds = Array.isArray(ids) ? ids : [ids];
          const productos = await productsDao.getProductosByIds({ _id: { $in: arrayIds } });
          return productos;
        } catch (error) {
          console.error('Error al obtener productos del carrito:', error);
          throw error;
        }
    };
    
}