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


async upDateProduct (id, updatedProd) {
    try {
        const productById = await this.model.findByIdAndUpdate(id, updatedProd,{new: true});//me lo devuelve a la bd actualizado solo cuando se usa find by id andupdate
        if(!productById){
            throw new Error ("el producto no existe") 
        }
            return productById;
       } catch (error) {
        console.error(error.message);
        return undefined
    }
  }  
  async deleteProduct(id) {
    try {
        console.log("id", id);
        if (!id) {
            throw new Error("ID no definido para eliminar el producto");
        }
      const product = await this.model.findById(id);

        if (product) {
            const deletedProduct = await this.model.findByIdAndDelete(id);

            if (deletedProduct) {
                console.log("Producto eliminado:", deletedProduct);
                return "Producto eliminado";
            } else {
                console.log("El producto no existe");
                return "El producto no existe";
            }
        } else {
            console.log("Producto no encontrado");
            return "Producto no encontrado";
        }
    } catch (err) {
        console.error("Error al eliminar el producto:", err);
        throw err; // Re-lanzar el error para que sea manejado por el llamador
    }
}
        
    
};  


