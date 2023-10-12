import winston from "winston";
import dotenv from "dotenv";

dotenv.config();

const currentEnv =  process.env.LOGGER;
//crear el transporter almacenamiento para los logs(registros)

const loggerDesarrollo = winston.createLogger({
    transports:[
        //definir los transportes 
        new winston.transports.Console({level:"debug"}) 
    ]
});

const loggerProductivo = winston.createLogger({
    transports:[
     new winston.transports.Console({level:"info"}),
     new winston.transports.File({ filename:"./logs/errors.log", level:"error"})
    ]
});

//definir logger dependiendo su uso
export const addLogger = ( )=>{
    let logger;
    if(currentEnv === "development"){
        logger = loggerDesarrollo;
    }else{
        logger = loggerProductivo;
    }
    return logger;
}        
