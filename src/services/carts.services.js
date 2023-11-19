import { cartsService } from "../controllers/carts.controllers.js";
import { cartsModel } from "../dao/models/carts.model.js";

import { cartsDao, productsDao } from "../dao/factory.js";


export class CartsService {
    static cartCreated = async (newCart)=>{
        return await cartsService.addCart(newCart);
    };
    static cartCreatedFind = async ()=>{
        return await cartsService.addCart();
    };
    static getCarts = async ()=>{
       return await cartsService.getAll();
    };
    static prodPopulateCid = async (cartId)=>{
        return await cartsModel.findById(cartId).populate("products");
    }; 
    static cartporCid = async (cartId)=>{
        return await cartsModel.findById(cartId);
    }
    static cidProductPid = async (cartId, productId)=>{
        return await cartsService.addProductInCart(cartId, productId);
    };
    static addproductCart = async (cartId, productId)=>{
        return await cartsDao.getById(cartId), productsDao.getById(productId);
        
    };
    static deletecid = async ({_id:idDel})=>{
        return await cartsModel.deleteOne({_id:idDel});
    };
    static putporcid = async (cartId, cartInfo)=>{
        return await cartsService.upDateCart(cartId, cartInfo);
    };
    static deleteByCid = async (cartId)=>{
        return await cartsModel.findById(cartId);
    };
    static deleteCidProducts = async (cartId)=>{
        return  await cartsModel.findById(cartId);
    };
    static upDateCart = async ( cartId, cart)=>{
        return await cartsDao.upDateCart(cartId, cart);
    }
}
