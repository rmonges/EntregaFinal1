export class ProductsManagerMemory {
    constructor(){
        this.contacts = [];
     };
    async get (){
        try {
            return this.products;
        } catch (error) {
            throw error;
        }
    };
    
}