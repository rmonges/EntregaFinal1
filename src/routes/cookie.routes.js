import { Router } from "express";
import { CoockiesControllers } from "../controllers/coockies.controllers.js";

const router = Router();

router.get("/crearCookie", CoockiesControllers.crearCookie);
router.get("/crearCookie3", (req, res)=>{
    res.cookie("cookie3", "Mana").send("cookiecreada");
})
//le damos tiempo de caducacion
router.get("/crearCookie2", (req, res)=>{
    res.cookie("cookie2", "pepitos" ,{maxAge:5000}).send("cookiecreada");
});
//ruta para cookie firmada
router.get("/crearCookie4", (req, res)=>{
    res.cookie("cookie4", "{username:'pepe', role:'user'}", {signed:true}).send("cookiecreada");
});
//rutas para obtener cookies firmadas
router.get("/leercookisfirmadas", (req, res)=>{
    const cookies = req.signedCookies;
    res.cookie(cookies);
});


router.get("/leercookies", (req, res)=>{
    const cookies = req.cookies;
    res.send(cookies);
})

router.post("/cookieform",(req, res)=>{
    const loginfo = req.body;
    res.cookie("userinfo", `{user:${loginfo.email}}`, {maxAge:10000}).send("informacion recibida");
} )

//se pueden elimnar

//fimar una cookie



export {router as cookiesRouter};