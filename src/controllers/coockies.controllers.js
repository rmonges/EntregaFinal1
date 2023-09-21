 export class CoockiesControllers {
    static crearCookie = (req, res)=>{
        res.cookie("cookie1", "oreo").send("cookiecreada");
    }
 }