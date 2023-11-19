import {Router} from "express";
import { userDao } from "../dao/factory.js"
import { createHash, isValidPassword, uploaderProfile } from "../utils.js";
import passport from "passport";
import { SessionsController } from "../controllers/session.controllers.js";


const router =Router();

    
router.get("/loginGithub", passport.authenticate("githubLoginStrategy"));

router.get("/github-callback",passport.authenticate("githubLoginStrategy", {
    failureRedirect:"/api/sessions/fail-signup"
}), SessionsController.githubCallback);
                                    //req.file se agrega
router.post("/signup", uploaderProfile.single("avatar") ,passport.authenticate("signupStrategy", {
    failureRedirect:"/api/sessions/fail-signup"// en caso de falla de registro redireccionamos a esta ruta 
}), SessionsController.redirectLogin);

router.get("/fail-signup", SessionsController.failSignup);

router.post("/login", passport.authenticate("loginStrategy", {
    failureRedirect:"/api/sessions/faillogin",
}),SessionsController.login);

router.get("/faillogin", SessionsController.faillogin);


router.get("/logout", SessionsController.logout);


router.get("/visitas", SessionsController.visitas)

router.post("/changePass", SessionsController.changePassword)

router.post("/forgot-password", SessionsController.forgotPassword)
router.post("/reset-password", SessionsController.resetPassword)


export {router as sessionsRouter};

