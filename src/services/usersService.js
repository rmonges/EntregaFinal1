import { userDao } from "../dao/index.js";
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

}