import { cartsService } from "../controllers/carts.controllers.js";
import { cartsModel } from "../dao/models/carts.model.js";
export class CartsService {
    static cartCreated = async ()=>{
        return await cartsService.addCart(newCart);
    };
    static cartCreatedFind = async ()=>{
        return await cartsService.addCart();
    };
    static getCarts = async ()=>{
       return await cartsService.getAll();
    };
    static prodPopulateCid = async ()=>{
        return await cartsModel.findById(cartId).populate("products");
    }
}
