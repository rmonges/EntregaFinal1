import { query } from "express"
import { UsersService } from "../services/usersService.js"

export class UsersController {
    static modifyRole = async(req, res)=>{
        try {
            const userId = req.params.uid; 
            const user = await UsersService.getById(userId);
            console.log("usermodify", user)
            const userRole = user.role;
            console.log("userRole",userRole)
            if(userRole === "user"){
                user.role = "premium";
            }else if(userRole === "premium"){
                user.role= "user";
            }else{
                res.json({status:"error", message:"No se puede cambiar el role de este usuario "})  
            }
            await UsersService.updateUser(user._id, user)    
            res.json({status:"success", message:`el nuevo rol del usuario es ${user.role} `})
        } catch (error) {
            res.json({status:"error", message:error.message})
        }
    }
}