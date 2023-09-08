import {Router} from "express";
import { userService } from "../dao/index.js"
import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";

const router =Router();

    
router.get("/loginGithub", passport.authenticate("githubLoginStrategy"));
router.get("/github-callback",passport.authenticate("githubLoginStrategy", {
    failureRedirect:"/api/sessions/fail-signup"
}), (req, res)=>{
    res.redirect("/perfil");
}
);
router.post("/signup", passport.authenticate("signupStrategy", {
    failureRedirect:"/api/sessions/fail-signup"// en caso de falla de registro redireccionamos a esta ruta 
}), (req, res)=>{
    res.render("login", {message:"usuario registrado"});
});
router.get("/fail-signup", (req, res)=>{
    res.render("signup", {error:"No se pudo registrar el usuario"});
});

router.post("/login", passport.authenticate("loginStrategy", {
    failureRedirect:"/api/sessions/fail-login",
}),(req, res)=>{
    const user = req.user;
    console.log("user", user);

    res.render("profile",{user} );
});

router.get("/fail-login", (req, res)=>{
     res.render("login", {error:"credenciales invalidas"})
})


router.get("/logout", async (req, res)=>{
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
     })

//rutas para generar la session del usuario
// router.get("/login", (req, res)=>{
//     const {username} = req.query;
//     req.session.user = {username, visitas:1};
//     console.log(req.session);
//     res.send("usuario logeado");
// });

router.get("/visitas",(req, res)=>{
    console.log(req.session)
    if(req.session?.user?.username){
        req.session.user.visitas++;
        res.send(`ya estas logueado y visitaste la pagina ${req.session.user.visitas}`)
    }else{
        res.send("necesitas estar logueado")
    }
})

router.post("/changePass", async (req, res)=>{
    try {
        const form = req.body;
        const user = await userService.getByEmail(form.email);
        if(!user){
            res.render("changePassword", {error:"no es posible cambiar contraseña"});
        }else{
          user.password = createHash(form.newPassword);
          await userService.upDate(user._id, user);
          return res.render("login", {message:"Contraseña restaurada"})
        }
    } catch (error) {
        res.render("changePassword", {error:error.message});
    }
})

export {router as sessionsRouter};

