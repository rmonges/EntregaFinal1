import { MessagesController } from "../controllers/messages.controllers.js";
import { Router } from "express";
import { messagesModel } from "../dao/models/messages.model.js";
import { __dirname } from "../utils.js";

const router = Router();


router.get("/",MessagesController.getmsgs);
router.post("/",MessagesController.postmsgs);
router.get("/:mid",MessagesController.midmsgs );
router.delete("/:mid",MessagesController.deletemsgs);

export {router as messagesRouter}; 