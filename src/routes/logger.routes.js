import {Router} from "express";
import { addLogger } from "../helpers/logger.js";
//import { loggerDesarrollo, loggerProductivo } from "../helpers/logger.js ";

const router = Router();
const logger = addLogger();
router.get("/", (req,res)=>{
     logger.silly("este es un entorno silly");
     logger.info("este es un entorno productivo");
     logger.debug("sistema de desarrollo debug");
     logger.http("este es un entorno http");
     logger.error("este es un entorno error");
     logger.warn("este es un entorno warn");
     logger.verbose("este es un entorno verbose");
     res.send("peticion recibida");
})

export {router as loggersRouter};