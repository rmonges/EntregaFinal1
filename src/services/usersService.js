import { userDao } from "../dao/factory.js";
export class UsersService {
    static getUserByEmail = async (username)=>{
     return await userDao.getByEmail(username);
    };
    static userCreated = async (newUser)=>{
        return await userDao.save(newUser);
    };
    static getById = async (id)=>{
        return await userDao.getById(id)
    };
    static upDateUsers = async(condition, updatedField)=>{
        return await userDao.upDateUsers(condition, updatedField);
    }
    static updateUser = async(userId, userInfo)=>{
        return await userDao.upDate(userId, userInfo);
    }
    
    static getUser = async()=>{
        return  await userDao.get();
   }
   static delUser = async (userId)=>{
      return await userDao.delete(userId);
}
}