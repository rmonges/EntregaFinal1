import {productsDao} from "../dao/factory.js"
import { ProductsMongo } from "../dao/manager/mongo/productsMongo.js";
import { productsModel } from "../dao/models/products.model.js";

export class ProductsService {
    static getProducts =  async ()=>{
        return await ProductsMongo.getProduct()
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
    
}