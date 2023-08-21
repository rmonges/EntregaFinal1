import { userModel } from "../../models/users.model.js"

export class UsersMongo{
    constructor(){
        this.model = userModel;
    }

    async save(user){
        try {
            const userCreated =  await this.model.create(user);
            console.log("userCreated", userCreated)
            return userCreated;
        } catch (error) {
            throw error;
        }
     };

     async getById(userId){
        try {
            const user =  await this.model.findById(userId);
            if(user){
                return user;
            }else{
                throw new Error ("el usuario no existe");
            }
            
        } catch (error) {
            throw error;
        }
     };
     async getByEmail(userEmail){
        try {
            const user =  await this.model.findOne({userEmail});
            if(user){
                return user;
            }else{
                return null;
            }
            
        } catch (error) {
            throw error;
        }
     };  
     
};