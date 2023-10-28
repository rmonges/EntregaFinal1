import { userModel } from "../../models/users.model.js"

export class UsersMongo{
    constructor(){
        this.model = userModel;
    }
    async get(user){
        try {
            const userGet =  await this.model.find(user);
            console.log("userCreated", userGet)
            return userGet;
            
        } catch (error) {
            throw error;
        }
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
            const user =  await this.model.findById(userId).lean();
            if(user){
                return user;
            }else{ 
                throw new Error ("el usuario no existe" + error.message);
            }
            
        } catch (error) {
            throw error;
        }
     };
     async getByEmail(userEmail){
        try {
            const user =  await this.model.findOne({email:userEmail}).lean();
            console.log("userrrrrmongoemail", user)
            if(user){
                return user;
            }else{
                return null;
            }
            
        } catch (error) {
            throw error;
        }
     };  
     


async upDate (userId,newUserInfo){
    try {
        const userUpDate = await this.model.findByIdAndUpdate(userId, newUserInfo, {new:true});
         return userUpDate;
       } catch (error) {
        return error;
     }
    
  } 
};