import {Router} from "express";
import { userService } from "../dao/index.js"

const router =Router();

router.post("/signup", async (req, res)=>{
    try {
       const signupForm = req.body;
       console.log(req.body)
       const usersign = await userService.getByEmail(signupForm.email);
       console.log("userrr",usersign);
       if(usersign){
           return res.render("signup", {error:"el usuario ya esta registrado"});
       }
       const result = await userService.save(signupForm);
      // res.redirect("/login"), //redirijo a la ruta de loging
         res.render("login", {message:"usuario registrado"})
         console.log("usuario nuevo");

    } catch (error) {
        res.render("signup", {error:error.message});
       //res.send({status:error}).send(body)
    }
})

router.post("/login", async (req, res)=>{
    try {
        const loginForm = req.body;
        console.log(loginForm)
        const user = await userService.getByEmail(loginForm.email)
        console.log("userlog", user)
        if(!user){
            return res.render("login", {error:"el usuario no se a registrado"});
        }
        if(user.password === loginForm.password){
            req.session.userInfo = {
                first_name:user.first_name,
                email:user.email
            };
            res.redirect("/perfil");
        }else{
            return res.render("login", {error:"credenciales invalidas"})
        }       
    } catch (error) {
        res.render("signup", {error:error.message});
    }
})

// router.post("/logout", async (req, res)=>{
//     try {
//         // const singupForm = req.body;

//         // const user = await userService.getByEmail()
//         // const result = await userService.save (singupForm);
//         res.render("endpoint para desloguear usuarios " );
        
//     } catch (error) {
//         res.render("signup", {error:error.message});
//     }
// })

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

export {router as sessionsRouter};

