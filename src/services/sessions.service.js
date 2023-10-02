import { userDao } from "../dao/factory.js" 
export class SessionsService {
    static changePassword = async (form)=>{
        return await userDao.getByEmail(form.email)
    }; 
}