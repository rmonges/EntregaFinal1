import { MessagesService } from "../services/messages.service.js";
export class MessagesController {
    static getmsgs = async (req, res)=>{
        try {
            const messagesAll = await MessagesService.getmessagesAll();
            console.log("messages", messagesAll)
            res.json({status:"success", data:messagesAll});
        } catch (error) {
            console.log(error.menssage)
            res.json({status:"error", message:"hubo un error al obtener los mensages"})
        }
    };
    static postmsgs = async (req, res)=>{
        try {
            const message = req.body;
            const messagesCreated = await MessagesService.postmsgs(message);
            console.log("messagesCreated", messagesCreated)
            res.json({status:"success", data:messagesCreated});
        } catch (error) {
            console.log(error.menssage)
            res.json({status:"error", message:"hubo un error al obtener los messages"})
        }
    }
    static midmsgs = async (req, res)=>{
        try {
            const msjId =(req.params.mid);
            const mensage = await MessagesService.findMsgById(msjId);
            console.log("message", mensage)
            res.json({status:"success", data:mensage});
           
       }catch (error) {
            res.json({status:"error", message:error.message});
        };
    }
    static deletemsgs =  async (req, res)=>{
        try {
            const idDel= req.params.mid;
            await MessagesService.deletemsgs({_id:idDel});
            res.json( {status:"succes", message:"mensaje eliminado correctamente "});
        
        }catch (error) {
            res.json({status:"error", message:"error"});
        };
        
    }
}