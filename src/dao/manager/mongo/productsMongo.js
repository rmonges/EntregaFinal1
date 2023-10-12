import {productsModel} from "../../models/products.model.js";

export class ProductsMongo{
    constructor(){
        this.model = productsModel;
    };
    async saveProduct(productInfo){
        try {
            const productCreated = await this.model.create(productInfo);
            
            return productCreated; 
        } catch (error) {
            throw error;
        }
          
    }

    //get products
    async getProduct(){
        try{
            const products = await this.model.find().lean();
           // console.log("prrrrroducts",products )
            return products;
        }catch(error){
            console.log(error.message);
            // throw error
            throw new Error("Hubo un error al obtener los productos");
        }
    };

    //get paginate
    async getWithPaginate(query, options){
        try {
            const result = await this.model.paginate(query, options);
            return result;
        } catch (error) {
            throw error;
        }
    } 

    //save product
    async addProduct(productInfo){
        try{
            const productCreated = await this.model.create(productInfo)
            return productCreated;
        }catch(error){
            console.log(error.message);
            // throw error
            throw new Error("Hubo un error al crear el producto");
        }
    };


async getById(id){
    //devuelve el producto que cumple con el id recibido
    try{
        const product = await this.model.findById(id);
        if(!product){
            throw new Error ("el producto no existe")
        }
        return product;
    }catch(error){
        console.log(error.message);
        // throw error
        throw new Error("Hubo un error al obtener el producto");
    }
};


async upDateProduct  (id, updatedProd) {
    try {
        const productById = await this.model.findByIdAndUpdate(id, updatedProd,{new: true});
        if(!productById){
            throw new Error ("el producto no existe") 
        }
            return "producto actualizado"
       } catch (error) {
        console.error(error.message);
        return undefined
    }
  }  


   async deleteProduct(id) {
    try {
        const product = await this.model.find(id);
        if(pet){
           await this.model.findOneAndDelete({id});
        }
         return "mascota eliminada"; 
   } catch (err) {
        console.error("Error al eliminar el producto:", err);
    }
}

        
    
};  


