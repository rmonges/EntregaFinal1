import { productsDao } from "../../dao/factory.js";
export const getOrderAmount = async (products) => {
    let amount = 0;

   for (let index =0; index < products.length; index++){
       const product = products[index]; 
       const productDB = await productsDao.getById(item.id);
       console.log("productDB", productDB)

       //let operation = 
   } 
} 