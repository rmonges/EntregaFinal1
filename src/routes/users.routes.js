import { Router } from "express";
import { checkRole } from "../middlerwares/auth.js";
import { UsersController } from "../controllers/users.controllers.js";
const router = Router();

router.post("/premium/:uid", checkRole(["admin"]), UsersController.modifyRole);
export {router as usersRouter};