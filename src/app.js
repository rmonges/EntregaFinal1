import express from "express";
import { __dirname  } from "./utils.js";
import path from "path";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import handlebars, { engine } from "express-handlebars";
import { viewsRouter } from "./routes/views.routes.js";
import { Server } from "socket.io";
import { setTimeout } from "timers";
import { ProductManager } from "./dao/manager/productManager.js";
import mongoose from "mongoose";
import { messagesRouter } from "./routes/messages.routes.js";
import { CartsManager } from "./dao/manager/fileSystem/cartsFiles.js";
import { config }  from "./config/config.js"
import { connectDB } from "./config/dbConnection.js";
import { messagesModel } from "./dao/models/messages.model.js";
import { cookiesRouter } from "./routes/cookie.routes.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import { sessionsRouter } from "./routes/session.routes.js";
import FileStore from "session-file-store";
import MongoStore from "connect-mongo";
import { initializaPassport } from "./config/passportConfig.js";
import passport from "passport";
import dotenv from "dotenv";
import { productsDao } from "./dao/index.js";

//const port = 8080;//puerto de conexion, atravez del puerto recibo o envio informacion en mi computadora
//creamos la aplicacion del servidor
const app = express();
const port = config.server.port;


app.use(express.json())//middleware para recibir jsons
app.use(express.static(path.join(__dirname,"/public")));//path es una libreria que me permite unir rutas, entro la ruta dirname "src"=>public
app.use(express.urlencoded({extended:true}));
app.use(cookieParser("securitykey"));
// const fileStorage = FileStore(session);
app.use(session({ 
    store: MongoStore.create ({//defimos en la conf de la sesiones donde el sitio donde vamos a manejar el almacenamiento de las sesiones 
        mongoUrl:config.mongo.url,
    }),
    secret:config.server.secretSessions, //cifra el id de a session dentro  del coockie
    resave:true,//permite saber si el usuario tiene una sesion comenzada y lo archiva en algun lado
    saveUninitialized:true//mantiene la info del usuario que inicio la session    
}));

//configuracion de passport 
initializaPassport();//inicializamos todas las estrategias
app.use(passport.initialize());//inicializamos todas las librerias
app.use(passport.session());//a todos los usuarios le manejamos las sessiones con passport

//levantar el servidor, l aplicacion va a estar pendiente de recibir peticiones,le indicamos el puerto por donde va a recibir la info
//const productsDao = new ProductManager('products.json');
const cartsService = new CartsManager('carts.json')

//WEBSOCKET GUARDAMOS EL SERVIDOR HTTP EN UNA VARIABLE
const httpServer = app.listen(port,()=>console.log(`El servidor esta escuchando en el puerto ${port}`));

//connectDB();
//RUTAS DE HANDLERBARS
app.engine('.hbs', handlebars.engine({extname: '.hbs'}));//inicia motor plantilla handlerbars
app.set('view engine', '.hbs');//motor a utilizar
app.set('views', path.join(__dirname, './views'));


//CREAMOS SERVIDO R DE WEB SOCKET
const socketServer = new Server(httpServer);//vinculamos el serv de webs al de http

//creamos canal de comunicacion entre el servidor y el cliente
socketServer.on("connection", async (socketConnected)=>{
    
    console.log(`nuevo cliente conectado ${socketConnected.id}`)
     const productList = await productsDao.getProduct({});
     const cartList = await cartsService.getAll({});

    //RECIBIR EVENTO/DATOS DEL CLIENTE
    socketServer.emit("cartList", cartList);
    socketServer.emit("productList", productList);

 socketConnected.on("addProduct", async (obj)=>{
    //console.log("addProd", obj)
 await productsDao.addProduct(obj)
 //console.log("addProd", obj)
  const productList = await productsDao.getProduct({})

  socketServer.emit("productList", productList)

})
//ENVIAR DATOS DEL SERVIDOR AL CLIENTE  ENVIAMOS
//SIN QUE EL CLIENTE NO LA SOLICITE

socketConnected.on("deleteProduct", async (id)=>{
    console.log("id:", id)
    await productsDao.deleteProduct(id);
    const productList = await productsDao.getProduct({});
    socketConnected.emit("productList", productList);

})

});


//routes JWTOKEN


app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/messages", messagesRouter);
app.use(viewsRouter);
app.use("/", cookiesRouter);
app.use("/api/sessions", sessionsRouter);





