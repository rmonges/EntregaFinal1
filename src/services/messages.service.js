import { messagesModel} from "../dao/models/messages.model.js"
export class MessagesService {
    static getmessagesAll = async ()=>{
        return await messagesModel.find();
    };
    static postmsgs = async (message)=>{
        return  await messagesModel.create(message);
    };
    static findMsgById = async (msjId)=>{
        return await messagesModel.findById (msjId);
    };
    static deletemsgs =  async({_id:idDel})=>{
        return await messagesModel.deleteOne({_id:idDel})
    };
    static midmsgs = async (msjId)=>{
        return await messagesModel.findById (msjId);
    };
}