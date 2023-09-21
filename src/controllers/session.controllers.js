import passport from "passport";
import { SessionsService } from "../../src/services/sessions.service.js";
import { userDao } from "../dao/index.js";
export class SessionsController {
    static redirectLogin = (req, res)=>{
        res.render("login", {message:"usuario registrado"});
    }
    static failSignup = (req, res)=>{ res.render("signup", {error:"No se pudo registrar el usuario"});
    }
    static login =(req, res)=>{
        const user = req.user;
        console.log("user", user);
        res.render("profile",{user} );
    }
    static failLogin =  (req, res)=>{
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
}