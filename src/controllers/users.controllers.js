import { query } from "express"
import { UsersService } from "../services/usersService.js"
import { transporter, adminEmail } from "../config/email.js"

export class UsersController {
    static modifyRole = async(req, res)=>{
        try {
            const userId = req.params.uid; 
            const user = await UsersService.getById(userId);
            console.log("userIdmodifi", userId)
            const userRole = user.role;
            
                if(userRole === "user"){
                    user.role = "premium";
                }else if(userRole === "premium"){
                    user.role= "user";
                }else{
                    res.json({status:"error", message:"No se puede cambiar el role de este usuario "})  
                }
                await UsersService.updateUser(user._id, user) 
                
                const users = await UsersService.getUser();
                const data={    
                    tittle:"Usuarios autorizados", 
                    users: users.map(user=>({
                        id:user.id.toString(),
                        first_name: user.first_name,
                        email: user.email,
                        rol: user.role,
                 })),
                };
                res.render("Users", data)
            // }else{
            //     res.json({status:"error", message:"el usuario no ha cargado todos los documentos"})
            // }            
        } catch (error) {
            res.json({status:"error", message:error.message})
        };
     };
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
    static deleteUsers = async (req,res)=> {
        try {
            const users = await UsersService.getUser();
            const timeNow = new Date();
            const limiteTiempo = 2 * 24 * 60 * 60 * 1000; // 2 días en milisegundos
    
            // Filtra los usuarios que no se han conectado en los últimos 2 días
            const usuariosDesconectados = users.filter(user => {
                if (user.last_connection) {
                    const lastConnectionTime = new Date(user.last_connection);
                    return timeNow - lastConnectionTime > limiteTiempo;
                } else {
                    return true;
                }
            });
    
            const condition = { _id: { $in: usuariosDesconectados.map(user => user._id) } };
    
            const usersUpdated = await UsersService.upDateUsers(condition, { status: "eliminado" });
            usuariosDesconectados.forEach(async (user) => {
                const emailOptions = {
                    from: adminEmail,
                    to: user.email,
                    subject: 'Tu sesión ha caducado por inactividad',
                    text: 'Tu sesión ha caducado. Por favor, vuelve a iniciar sesión.'
                };
                await transporter.sendMail(emailOptions);
            });
            res.json({ status: "success", message: "usuarios eliminados correctamente", usersUpdated });
        } catch (error) {
            res.json({ status: "error", message: error.message });
        };
    };
    static delete = async (req, res)=>{
        try {
            const userId= req.params.uid;
            const user = await UsersService.getById(userId);
            if(user){
             await UsersService.delUser(user);
             const users = await UsersService.getUser();
             const data={    
                 tittle:"Usuarios autorizados", 
                 users: users.map(user=>({
                     id:user.id.toString(),
                     first_name: user.first_name,
                     email: user.email,
                     rol: user.role,
              })),
             };
             res.render("Users", data)
            }else{
                res.json({ status: "error", message: "Usuario no existe" });
            }
        } catch (error) {
            res.status(500).json({ status: "error", message: error.message });
            
        }
    }
}