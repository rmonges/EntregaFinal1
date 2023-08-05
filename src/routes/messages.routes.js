
import { Router } from "express";
import { messagesModel } from "../dao/models/messages.model.js";
import { __dirname } from "../utils.js";

const router = Router();


router.get("/", async (req, res)=>{
    try {
        const messagesAll = await messagesModel.find();
        console.log("messages", messagesAll)
        res.json({status:"success", data:messagesAll});
    } catch (error) {
        console.log(error.menssage)
        res.json({status:"error", message:"hubo un error al obtener los productos"})
    }
})
router.post("/", async (req, res)=>{
    try {
        const messagesCreated = await messagesModel.create(req.body);
        console.log("messagesCreated", messagesCreated)
        res.json({status:"success", data:messagesCreated});
    } catch (error) {
        console.log(error.menssage)
        res.json({status:"error", message:"hubo un error al obtener los productos"})
    }
})
router.get("/:mid", async (req, res)=>{
    try {
        const msjId =(req.params.mid);
        const mensage = await messagesModel.findById(msjId);
        console.log("message", mensage)
        res.json({status:"success", data:mensage});
       
   }catch (error) {
        res.json({status:"error", message:error.message});
    };
});
router.delete("/:mid", async (req, res)=>{
    try {
        const idDel= req.params.mid;
        await messagesModel.deleteOne({_id:idDel});
        res.json( {status:"succes", message:"mensaje eliminado correctamente "});
    
    }catch (error) {
        res.json({status:"error", message:"error"});
    };
    
});

export {router as messagesRouter}; 