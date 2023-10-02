import { CartsService } from "../services/carts.services.js";
import { ProductsService } from "../services/products.services.js";
import { TicketsService } from "../services/tickets.service.js";
import { CartsController } from "./carts.controllers.js";

export class TicketController{
    static async createTicket (req,res) {
        try {
           
            const cartId = req.params.cid;
            const cart = await CartsService.cartporCid(cartId);
            const productsCart = cart.products;
            let purchaseProducts = [];
            let rejectProducts = [];
            for(let i;i<productsCart.length; i++){

                const product = await ProductsService.getpid(productsCart[i].productId)
                if(quantity < product.stock){
                  purchaseProducts.push(product);
                  return purchaseProducts;
                }else{
                    rejectProducts.push(product);
                    return rejectProducts;
                }
            }
            const newTicket = {
                code,
                purchase_datetime :new Date(),
                amount,
                purcharser:req.user.email, 
            }

            const ticketCreated = await TicketsService.createTicket(newTicket);
        } catch (error) {
            res.json({ status:"error", message:error.message});
        }

    } 
}
