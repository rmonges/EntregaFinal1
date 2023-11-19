import { Router } from "express";
import { checkRole } from "../middlerwares/auth.js";
import { UsersController } from "../controllers/users.controllers.js";
import { uploaderDocument } from "../utils.js";
const router = Router();

router.get("/", UsersController.getUser);

router.post("/premium/:uid", checkRole(["admin"]), UsersController.modifyRole);
router.put("/:uid/documents", uploaderDocument.fields([
    {name:"identificacion", maxCount:1},
    {name:"domicilio", maxCount:1},
    {name:"estadoDeCuenta", maxCount:1},
    ]), UsersController.uploadaDocuments);
export {router as usersRouter};

