import { userDao } from "../dao/index.js" 
export class SessionsService {
    static changePassword = async (form)=>{
        return await userDao.getByEmail(form.email)
    }; 
}