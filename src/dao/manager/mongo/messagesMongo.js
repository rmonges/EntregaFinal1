import { messagesModel } from "../../models/messages.model.js"; 
export class messagesModel{
    constructor(){
        this.model = messagesModel;
    };

    //get messages
    async getAll(){
        try{
            const messages = await this.model.find();
            return messages;
        }catch(error){
            console.log(error.message);
            // throw error
            throw new Error("Hubo un error al obtener los mensajes");
        }
    };

    //save messages
    async save(productInfo){
        try{
            const messageCreated = await this.model.create(productInfo)
            return messageCreated;
        }catch(error){
            console.log(error.message);
            // throw error
            throw new Error("Hubo un error al crear el producto");
        }
    };
}