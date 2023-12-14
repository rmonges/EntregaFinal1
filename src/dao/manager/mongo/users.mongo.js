import { userModel } from "../../models/users.model.js"

export class UsersMongo{
    constructor(){
        this.model = userModel;
    }
    async get(){
        try {
            const userGet =  await this.model.find();
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
           const user = await this.model.findById(userId).lean();
           return user;  // Devuelve el usuario o null si no se encuentra
        } catch (error) {
           console.error(`Error en getById: ${error.message}`);
           throw error;
        }
     }
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
     };
}; 

async upDateUsers(condition, updatedFields) {
    try {
        const usersUpdated = await this.model.updateMany(condition, updatedFields, { new: true });
        return usersUpdated;
    } catch (error) {
        return error;
    }
}

  async delete (userId){
    try {
        const userDelete = await this.model.findByIdAndDelete(userId);
        return userDelete;
    } catch (error) {
        return error;
    }
  }
};