import {Router} from "express";

const router =Router();

router.post("/signup", async (req, res)=>{
    try {
        const singupForm = req.body;

        const user = await userService.getByEmail()
        const result = await userService.save (singupForm);
        res.render("login", {message:"usuario registrado"});
        
    } catch (error) {
        res.render("signup", {error:error.message});
    }
})

//ruta para generar la session del usuario
router.get("/login", (req, resp)=>{
    const {userName} = req.query;
    req.session.user = {userName};
    console.log(req.session)
    // {
    //     Cookie:{}
    //     user:{
    //         userName:
    //     }
    // }
})
export {router as sessionsRouter};

