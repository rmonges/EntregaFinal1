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
import { productsDao } from "./dao/factory.js";
import { contactsRouter } from "./routes/contacts.routes.js";
import { transporter } from "./config/email.js";
import { twilioClient, twilioPhone } from "./config/twilio.js"; 
import { loggersRouter } from "./routes/logger.routes.js";
import  cluster  from "cluster";
import os from "os";
import { usersRouter } from "./routes/users.routes.js";


import handlebarsHelpers from 'handlebars-helpers';



//import { mockingRouter } from "./routes/mocking.routes.js";

// const numsCores = os.cpus().length;
// console.log(numsCores);
//const port = 8080;//puerto de conexion, atravez del puerto recibo o envio informacion en mi computadora
//creamos la aplicacion del servidor
const app = express();
const port = config.server.port || 8080;



app.use(express.json())//middleware para recibir jsons
app.use(express.static(path.join(__dirname,"/public")));//path es una libreria que me permite unir rutas, entro la ruta dirname "src"=>public
app.use(express.urlencoded({extended:true}));
app.use(cookieParser("securitykey"));
// const fileStorage = FileStore(session);
app.use(session({ 
    store: MongoStore.create ({//defimos en la conf de la sesiones donde el sitio donde vamos a manejar el almacenamiento de las sesiones 
        mongoUrl:config.mongo.url,
    }),
    secret:'tu_secreto_aqui***', //cifra el id de a session dentro  del coockie
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


const hbs = handlebars.create({
    extname: '.hbs',
    helpers: handlebarsHelpers(),
  });
app.engine('.hbs',hbs.engine);//inicia motor plantilla handlerbars
app.set('view engine', '.hbs');//motor a utilizar
app.set('views', path.join(__dirname, './views'));


//CREAMOS SERVIDO R DE WEB SOCKET
const io = new Server(httpServer);//vinculamos el serv de webs al de http

//creamos canal de comunicacion entre el servidor y el cliente
let messages = [];
io.on("connection", async (socket)=>{
    
    socket.emit("message", messages);
    socket.on("message", (data)=>{
    console.log("data", data);
    messages.push(data);
    io.emit("message", messages);
    })
    

    

     const productList = await productsDao.getProduct({});
     const cartList = await cartsService.getAll({});

    //RECIBIR EVENTO/DATOS DEL CLIENTE
    io.emit("cartList", cartList);
    io.emit("productList", productList);

 socket.on("addProduct", async (obj)=>{
    //console.log("addProd", obj)
 await productsDao.addProduct(obj)
 console.log("addProd", obj)
  const productList = await productsDao.getProduct({})

  io.emit("productList", productList)

})
//ENVIAR DATOS DEL SERVIDOR AL CLIENTE  ENVIAMOS
//SIN QUE EL CLIENTE NO LA SOLICITE

socket.on("deleteProduct", async (id)=>{
    console.log("id:", id)
    await productsDao.deleteProduct(id);
    const productList = await productsDao.getProduct({});
    socket.emit("productList", productList);

 })
})


const emailTemplate = `<div>
        <h1>Bienvenido!!</h1>
        <img src="https://fs-prod-cdn.nintendo-europe.com/media/images/10_share_images/portals_3/2x1_SuperMarioHub.jpg" style="width:250px"/>
        <p>Ya puedes empezar a usar nuestros servicios</p>
        <a href="https://www.google.com/">Explorar</a>
        <p>imagen cargada desde archivo</p>
        <img src= "cid:vesparesto"/>
</div>`
const userEmail = "robertoamonges@gmail.com"
app.post("/send-emailCoder", async(req,res)=>{
    try {
        const info = await transporter.sendMail({
            from:"Eccomerce pepito",
            to:userEmail, //correo del destinatario puede ser cualquiera.
            subject:"Correo para restablecer contraseña",
            html:emailTemplate
        });
        console.log(info);
        res.json({status:"success", message:`Correo enviado a ${userEmail} exitosamente`});
    } catch (error) {
        console.log(error.message);
        res.json({status:"error", message:"El correo no se pudo enviar"});
    }
});

//correo con imagenes
const emailTemplateImages = `<div>
        <h1>Bienvenido!!</h1>
        <img src="https://fs-prod-cdn.nintendo-europe.com/media/images/10_share_images/portals_3/2x1_SuperMarioHub.jpg" style="width:250px"/>
        <p>Ya puedes empezar a usar nuestros servicios</p>
        <a href="https://www.google.com/">Explorar</a>
        <p>imagen cargada desde archivo</p>
        <img src= "cid:vespaResto"/>
</div>`

app.post("/send-emailImages", async(req,res)=>{
    try {
        const info = await transporter.sendMail({
            from:"Eccomerce pepito",
            to:userEmail, //correo del destinatario puede ser cualquiera.
            subject:"Correo para restablecer contraseña",
            html:emailTemplate,
            attachments:[
                {
                    filename:"vespasss.png",
                    path:path.join(__dirname, "/public/image/vespasss.png"),
                    cid:"vespaResto"
                }
            ]
        });
        console.log(info);
        res.json({status:"success", message:`Correo enviado a ${userEmail} exitosamente`});
    } catch (error) {
        console.log(error.message);
        res.json({status:"error", message:"El correo no se pudo enviar"});
    }
});

//TWLIO ruta
const clientPhone = "+543413528805";
app.post("/sms-twilio", async (req, res)=>{
    try {
        //logica de finalizaiòn de la compra y  registro en l bd (soy trolo pipipi)
       const info = await twilioClient.messages.create({
            body:"tu registro fue exitoso", 
            from:twilioPhone,
            to:clientPhone
        });
        console.log("info del cliente", info);
        res.json({status:"sucess", message:"registro exitoso, msm enviado"})
    } catch (error) {
        res.json({status:"error", message:"el msj no es pudo enviar"});
    }
})


//routes JWTOKEN


app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/messages", messagesRouter);
app.use(viewsRouter);
app.use("/", cookiesRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/contacts", contactsRouter);
app.use("/loggersTest", loggersRouter);
app.use("/api/users", usersRouter);
//app.use("/api/mockingProducts", mockingRouter);





