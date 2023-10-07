import { __dirname } from "../../utils/utils.js";
import path from "path";
import fs from "fs";

//import {v4 as uuidv4} from 'uuid';




  export class ProductManager {
    constructor(fileName){
        this.path = path.join( __dirname,fileName);//src/products.json
        this.products=[];
    }
  

    fileExist(){
        return  fs.existsSync(this.path) //chequeo si existe un archivo, devuelve true o false
               };

     
    async loadProducts() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf8');
            if (data) {
                this.products = JSON.parse(data);
            } else {
                throw new Error("No es posible obtener los productos!");
            }
          
            return this.products;
        } catch (error) {
            console.error('Error loading products:', error);
            return [];
        }
     }

     exist = async (id) => {
        let products = await this.loadProducts();
        return products.find((p)=>p.id === id);
     }

              
    async getProduct(){
                try {
                     if(this.fileExist()){
                     //   console.log("existe archivo")
                            const contenido = await fs.promises.readFile(this.path, "utf-8");
                            const prodJson = JSON.parse(contenido);
                       //     console.log("getproduct",prodJson)
                            return prodJson;                    
                    } else{
                        return console.log("no hay achivos")
                        }
                }catch (error) {
                    console.error(error.message);
                    return undefined;
                };
            };



    async saveProducts() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
        } catch (error) {
            console.error('Error saving products:', error);
        };
    };                   



    async addProduct(productInfo){
        try {
             if(this.fileExist()){
                console.log("siiiiiiii", productInfo)
                const info = await fs.promises.readFile(this.path, "utf-8")
                const products =  JSON.parse(info);
               // console.log("productJSON", info)
                let newId;
               
                if(products.length===0){

                newId=1;
                
                console.log("primer ingreso del producto !!!!!!!!!!");

            }else{
                  newId=products[products.length -1].id+1;
                  products.id= newId;
                };
            
               const newProduct ={
                  id:newId,
                ...productInfo
               }
               products.push(newProduct);
               console.log(newProduct)
               await fs.promises.writeFile(this.path, JSON.stringify(products, null,'\t'));//lo primero es lo que quiero convertir a json
               return newProduct;
           }

        } 
        catch (error) {
            console.error(error.message);
        };
    };

    async getproductById(id){
        try {
            if(this.fileExist()){
            
                const productById = await this.exist();
                console.log(productById)
                return productById;     
            }else{
                 console.error("Result Product seach byId : Dont Found");
               };
            }
        catch (error) {
            console.error(error.message);
            return undefined;
        }
    };

   
   async upDateProduct  (id, updatedProd) {
    try {
        const productById = await this.exist(id);
        console.log("iddddd", updatedProd)
        if(!productById) return "producto no Encontrado";
            await this.deleteProduct(id);
            let productOld = await this.getProduct();//cargo prod anteriores
            let product= [{...updatedProd, id:id},...productOld];//traigo producto nuevo, asigno  id y se los sumo a los prodold
            await fs.promises.writeFile(this.path, JSON.stringify(product, null,'\t'));
            return "producto actualizado"
       } catch (error) {
        console.error(error.message);
        return undefined
    }

   }
   
    async deleteProduct(id){
        try {
            const product = await this.getProduct();
            const existProd = await this.exist(id)

            if(existProd){
            const newProduct = await product.filter(prod =>prod.id !== id);
                await fs.promises.writeFile(this.path, JSON.stringify(newProduct, null,'\t'))
                return "Producto Eliminado";
            }else{
                return "Producto no encontrado"
            };
        } catch (error) {
            console.error(error.message);
            return undefined
        }

        
    };  
    

}
