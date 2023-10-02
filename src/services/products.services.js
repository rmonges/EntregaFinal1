import {productsDao} from "../dao/factory.js"

export class ProductsService {
    static getProducts =  async ()=>{
        return await productsDao.getProduct()
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
    static delProduct = async ({_id:idDel})=>{
        return await productsModel.deleteOne({_id:idDel});
    }
    
}