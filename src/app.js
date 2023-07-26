import express from "express";
import { __dirname } from "./utils.js";
import path from "path";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import handlebars, { engine } from "express-handlebars";
import { viewsRouter } from "./routes/views.routes.js";
import { Server } from "socket.io";
import { setTimeout } from "timers";
import { ProductManager } from "./productManager.js";

const port = 8080;//puerto de conexion, atravez del puerto recibo o envio informacion en mi computadora
//creamos la aplicacion del servidor
const app = express();

app.use(express.json())
app.use(express.static(path.join(__dirname,"/public")));//path es una libreria que me permite unir rutas, entro la ruta dirname "src"=>public
app.use(express.urlencoded({extended:true}));
//levantar el servidor, l aplicacion va a estar pendiente de recibir peticiones,le indicamos el puerto por donde va a recibir la info
const productService = new ProductManager('products.json');

//WEBSOCKET GUARDAMOS EL SERVIDOR HTTP EN UNA VARIABLE
const httpServer = app.listen(port,()=>console.log(`El servidor esta escuchando en el puerto ${port}`));


//RUTAS DE HANDLERBARS
app.engine('.hbs', handlebars.engine({extname: '.hbs'}));//inicia motor plantilla handlerbars
app.set('view engine', '.hbs');//motor a utilizar
app.set('views', path.join(__dirname, './views'));

//CREAMOS SERVIDO R DE WEB SOCKET
const socketServer = new Server(httpServer);//vinculamos el serv de webs al de http

//creamos canal de comunicacion entre el servidor y el cliente
socketServer.on("connection", async (socketConnected)=>{
    
    console.log(`nuevo cliente conectado ${socketConnected.id}`)
     const productList = await productService.getProduct({});
    //RECIBIR EVENTO/DATOS DEL CLIENTE

socketServer.emit("productList", productList);

socketConnected.on("addProduct", async (obj)=>{
    console.log("addProd", obj)
 await productService.addProduct(obj)
 console.log("addProd", obj)
  const productList = await productService.getProduct({})

  socketServer.emit("productList", productList)

})
//ENVIAR DATOS DEL SERVIDOR AL CLIENTE  ENVIAMOS
//SIN QUE EL CLIENTE NO LA SOLICITE

socketConnected.on("deleteProduct", async (id)=>{
    console.log("id:", id)
    await productService.deleteProduct(id);
    const productList = await productService.getProduct({});
    socketConnected.emit("productList", productList);

})

//enviar evento a todos menos al que esta connectado
//     socketConnected.broadcast.emit("eventoTodosMenosElActual",
//     "todos menos el actual");
// //enia a todos los clientes
//      socketServer.emit("eventoParaTodos ","nueva promosion");


});


//routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/products/:prodid", productsRouter);
app.use(viewsRouter);




