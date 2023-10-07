import { MessagesController } from "../controllers/messages.controllers.js";
import { Router } from "express";
import { messagesModel } from "../dao/models/messages.model.js";
import { __dirname } from "../utils/utils.js";
import { checkRole, checkUserAutentificated } from "../middlerwares/auth.js"

const router = Router();


router.get("/",MessagesController.getmsgs);
router.post("/",checkUserAutentificated, checkRole(["admin"]), MessagesController.postmsgs);
router.get("/:mid",MessagesController.midmsgs );
router.delete("/:mid",MessagesController.deletemsgs);

export {router as messagesRouter}; 