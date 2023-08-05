import {productsModel} from "../../models/products.model.js";

export class ProductsMongo{
    constructor(){
        this.model = productsModel;
    };

    //get products
    async getProduct(){
        try{
            const products = await this.model.find().lean();
            return products;
        }catch(error){
            console.log(error.message);
            // throw error
            throw new Error("Hubo un error al obtener los productos");
        }
    };

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
        return product;
    }catch(error){
        console.log(error.message);
        // throw error
        throw new Error("Hubo un error al obtener el producto");
    }
};

async deleteProduct(id) {
    try {
        const product = await this.model.find();
     return await this.model.findOneAndDelete({id});
   
    
    } catch (err) {
        console.error("Error al eliminar el producto:", err);
    }
}
async upDateProduct  (id, updatedProd) {
    try {
        const productById = await this.model.findByIdAndUpdate(id, {$set: updatedProd});
            return "producto actualizado"
       } catch (error) {
        console.error(error.message);
        return undefined
    }

   }

        // if(existProd){
        // const newProduct = product.filter(prod =>prod.id !== id);
        //     await fs.promises.writeFile(this.path, JSON.stringify(newProduct, null,'\t'))
        //     return "Producto Eliminado";
        // }else{
        //     return "Producto no encontrado"
        // };
    

    
};  


