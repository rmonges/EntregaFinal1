import express from "express";
import { __dirname } from "./utils.js";
import path from "path";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import handlebars, { engine } from "express-handlebars";
const port = 8080;//puerto de conexion, atravez del puerto recibo o envio informacion en mi computadora

//creamos la aplicacion del servidor
const app = express();

app.use(express.json())
app.use(express.static(path.join(__dirname,"/public")));//path es una libreria que me permite unir rutas, entro la ruta dirname "src"=>public
app.use(express.urlencoded({extended:true}));
//levantar el servidor, l aplicacion va a estar pendiente de recibir peticiones,le indicamos el puerto por donde va a recibir la info
app.listen(port,()=>console.log(`El servidor esta escuchando en el puerto ${port}`));
//colocar el el package.json type:module para usar ES6 express en nodejs
//arreglo usuarios
app.engine('.hbs', handlebars.engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, './views'));
//routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/products/:prodid", productsRouter);
//declaro la instaciade la clase
//const productService = new ProductManager("./src/products.json");


const food = [
    {name: "Hamburguesa", price:200},
    {name: "Pizza", price:400},
    {name: "Hotdog", price:260},
    {name: "Sosa", price:120},
  ];



app.get("/", (req, res)=>{
    res.render("home");
})

app.get("/perfil", (req, res)=>{

    const user1 = {
    name:"pepe",
    lastname:"perez",
    age:"20",
    location:{
        city:"Buenos Aires"   
    }
   }
   res.render("profile", user1)
})

app.get("/comida", (req, res)=>{
    const testUser = {
           name:"pepe",
           role:"admin"
    }
    res.render("foodView",{
        name: testUser.name,
        isAdmin: testUser.role === "admin" ? true : false ,  //if(testUser.role === "admin"){isadmin == true}else{isadmin == false}
        food//food:food //si el la propiedad del objeto es igual al nombre del valor ded la vaialbe que le vamos asignar pordemos dejar solo un nombre 
    } )
})




//    app.get("/products", async (req,res)=>{
//      try {
//          const result = await prodService.getProduct();
//          console.log("resultado", result);
         
//          const limite = parseInt(req.query.limite);
        
//          if(limite>0){
//             const limitReq = result.filter(prod=>prod.id <=limite);
//             res.send(limitReq);
            
//         }else{
//             res.send(result);
//           }
         
//     } catch (error) {
//           res.send(error.message);
//       };
// });

// app.get("/products/:pid", async (req, res) => {
//     try {        //console.log(result);  
//         const result = await prodService.getProduct();
//         console.log("resultaado", result)
//         const pid = parseInt(req.params.pid);
//         console.log("elem", pid)
//         const idProd = result.find(elem => elem.id === pid);
//         res.send(idProd);
//     } catch (error) {
//         res.send(error.message);
//     }
// })