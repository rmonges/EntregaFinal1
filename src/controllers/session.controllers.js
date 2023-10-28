import { validateToken, createHash } from "../utils.js";
import { userDao } from "../dao/factory.js";
import { UsersService } from "../services/usersService.js"
import { generateEmailWithToken, recoveryEmail } from "../helpers/gmail.js"
export class SessionsController {
    static redirectLogin = (req, res)=>{
        res.render("login", {message:"usuario registrado"});
    }
    static failSignup = (req, res)=>{ res.render("signup", {error:"No se pudo registrar el usuario"});
    }
    static login =(req, res)=>{
        const user = req.user;
        console.log("userCONTROLLER", user);
        res.render("profile",{user} );
    }
    static faillogin =  (req, res)=>{
        res.render("login", {error:"credenciales invalidas"})
    };
    static logout = async (req, res)=>{
        req.logOut(error=>{
            if(error){
                return res.render("profile", {user:req.user, error:"No se pudo cerrar la sesion"});
            } else{
                req.session.destroy(error=>{//elimina la sesion de la base de datos
                    if( error ) return res.render("profile", {user:req.user, error:"No se pudo cerrar la sesion"})
                    res.redirect("/registro");
                })
            }
        })
     }
     static changePassword = async (req, res)=>{
        try {
            const form = req.body;
            const user = await  userDao.getByEmail(form.email);
            console.log("userchangePass", user)
            if(!user){
                res.render("changePassword", {error:"no es posible cambiar contraseña"});
            }else{
              user.password = createHash(form.newPassword);
              await userDao.upDate(user._id, user);
              return res.render("login", {message:"Contraseña restaurada"})
            }
        } catch (error) {
            res.render("changePassword", {error:error.message});
        }
    }
    static visitas = (req, res)=>{
        console.log(req.session)
        if(req.session?.user?.username){
            req.session.user.visitas++;
            res.send(`ya estas logueado y visitaste la pagina ${req.session.user.visitas}`)
        }else{
            res.send("necesitas estar logueado")
        }
    }
    static githubCallback = (req, res)=>{
        res.redirect("/perfil");
    }
    static forgotPassword = async (req, res) =>{
        try {
            const {email} = req.body;   
        const user = await UsersService.getUserByEmail(email);
        console.log("userforgotPassword", user, {email}, email)
        if(!user){
            return res.json({status:"error aca", message:"no es posible restablecer contraseña"})
        }//generamos el token
        const token = generateEmailWithToken(email, 3*60)//token de tres minutos
        //enviar al usurio con el mensaje
        await recoveryEmail(req,email,token);
        res.send("Correo enviado volver al inicio <a href='/login'>Login</a> ")
        } catch (error) {
            res.json({status:"error aca", message:"no es posible restablecer contaseña"})
        }
     }
    static resetPassword = async (req, res)=>{
        try {
            const token = req.query.token;
            const{newPassword}= req.body;
            const validEmail = validateToken(token);
            console.log("validaEmail", validEmail);
            console.log("newPassword", {newPassword});
        if(validEmail){
            console.log("hola validEmail");
            const user = await UsersService.getUserByEmail(validEmail);
            console.log("userrrrrr", user)
        if(user){
            console.log("hay useeerrrr");
            user.password = createHash(newPassword);
            console.log("newuser", user.password)
             await UsersService.updateUser(user._id, user);
           

            return res.send("Contraseña actualizada <a href='/login'>volver al Login</a>")
        }
       }else{
         return res.send("El Token esta vencido, volver a intentarlo <a href='/forgot-password'>Olvide mi contraseña</a>")
       }
        } catch (error) {
           res.send("No se pudo restablecer la contraseña, volver a intentarlo <a href='/forgot-password'>Olvide mi contraseña</a>")  
        };
    }   
}