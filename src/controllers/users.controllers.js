import { query } from "express"
import { UsersService } from "../services/usersService.js"

export class UsersController {
    static modifyRole = async(req, res)=>{
        try {
            const userId = req.params.uid; 
            const user = await UsersService.getById(userId);
            console.log("usermodify", user)
            const userRole = user.role;
            //validacion de status del usuario
            if(user.document.length >=3 && user.status ==="completo"){
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
            }else{
                res.json({status:"error", message:"el usuario no ha cargado todos los documentos"})
            }
            
        } catch (error) {
            res.json({status:"error", message:error.message})
        }
    }
    static getUser = async (req, res)=>{
            try {
                const users = await UsersService.getUser();
                res.json({status:"success", users});
            } catch (error) {
                res.json({status:"error", message:"no se obtubo el usuario"}) 
            }
    }
    static uploadaDocuments = async (req, res)=>{
        try {
             const userId = req.params.uid;
             const user = await UsersService.getById(userId);
             const identificacion = req.files?.identificacion?.[0] || null;//si req.file existe busca el primer elemento del array, si no existe vacio null
             const domicilio = req.files?.domicilio?.[0] || null;
             const estadoDeCuenta = req.files?.estadoDeCuenta?.[0] || null;
             //console.log(domicilio);
                const docs = [];
                if(identificacion){
                    docs.push({name:"identificacion", reference:identificacion.filename});
                };
                if(domicilio){
                    docs.push({name:"domicilio", reference:domicilio.filename});
                };
                if(estadoDeCuenta){
                    docs.push({name:"estadoDeCuenta", reference:estadoDeCuenta.filename});
                };
                //console.log(doc)
                user.documents = docs;
                if(docs.length ===3){
                    user.status = "completo";
                  }else{
                    user.status = "incompleto";
                  };
                  //console.log(user)
                  const result = await UsersService.updateUser(user._id, user);
                  res.json({status:"success", data:result});
        } catch (error) {
            
            res.json({status:"error", message:error.message})
        }
    }
}