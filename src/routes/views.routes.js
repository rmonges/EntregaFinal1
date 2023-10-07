import { Router } from "express"

import { __dirname } from "../utils/utils.js";
import path from "path";
import { productsModel } from "../dao/models/products.model.js";
import { cartsModel } from "../dao/models/carts.model.js";
import { CartsManager } from "../dao/manager/fileSystem/cartsFiles.js";
import { ProductsMongo } from "../dao/manager/mongo/productsMongo.js";
import { checkUserAutentificated, showLoginView } from "../middlerwares/auth.js";
import { productsDao } from "../../src/dao/factory.js";
import { ViewsController } from "../controllers/view.controllers.js";


const productsServiceMongo = new ProductsMongo("carts.json")
const cartsService = new CartsManager('../src/carts.json')


const router = Router();

  try {
    const productList = await productsDao.getProduct({});
     
     res.render("realTimeProducts",productList );

     socketClient.emit("messageEvent", `lista de Productos:${productList}`);
  } catch (error) {
     //res.render("error");
  }

//})

router.get("/products", async(req, res)=>{
  try {
    const {limit=10, page=1, stock, sort="asc"} = req.query;//defino datos por defecto (no le envio nada)
    const stockValue=  stock === 0 ? undefined : parseInt(stock);//cuando llega el valor es como un string debo convertirlo 
    if(!["asc", "desc"].includes(sort)){
      return res.render("products", {error:"Orden no valido"})
    };
    const sortValue = sort === "asc" ? 1 : -1;
    let query = {};
    if(stockValue){
      query = {stock:{$gte:stockValue}}  
    };
    const result = await productsServiceMongo.getWithPaginate(query,{
      page,
      limit,
      sort:{price:sortValue},
      lean:true
    })
    //console.log(result);
                    //http:localhost:8080//products      
    const baseUrl = `${req.protocol}://${req.get("host")}${req.get("host")}${req.originalUrl}`;
    const resultProductView = {
    status:"success",
payload:result.docs,
totalPages:result.totalPages ,
prevPage:result.prevPage,  
nextPage:result.nextPage,
page: result.page,  
hasPrevPage: result.hasPrevPage,
hasNextPage: result.hasNextPage, 
prevLink: result.hasPrevPage ?  `${baseUrl.replace(`page=${result.page}`,`page=${result.prevPage}`)}`  : null,
nextLink: result.hasNextPage ?  `${baseUrl.replace(`page=${result.page}`,`page=${result.nextPage}`)}`  : null,
  }
    console.log({user:req.session.userInfo})
    res.render("products",resultProductView)//al medioresultProductView,
   } catch (error) {
    console.log(error.message);
    res.render("products",{ error: "no es posible visualizar los datos"});
   }
 })
 router.get("/realTimeProducts", ViewsController.renderRealtimeProducts)
 router.get("/messages",ViewsController.renderMessages);
 router.get("/carts",ViewsController.renderCarts );
  
router.get("/home", ViewsController.renderHome);
  router.get("",ViewsController.renderLogings )


//clase 16 aplicar un indice para aumentar la velocidad de busqueda, se aplica em el modelo index

// router.get("/consultaNormal", async(req,res)=>{
//   try {
//       const result = await productsModel.find({tittle:"ojotas"}).explain("esecutionStats");
//       console.log(result);
//       res.json({status:"success", message:"usuario encontrado"});
//   } catch (error) {
//       res.json({status:"error", message:'Hubo un error en la consulta'});
//   }
// });


//Rutas sessions
router.get("/login", showLoginView,ViewsController.renderLogin ); 

router.get("/registro",showLoginView,ViewsController.renderSignup 
); 

router.get("/perfil", checkUserAutentificated, ViewsController.renderPerfil 
); 

// router.get("/products", checkUserAutentificated,  (req, res)=>{
//   console.log("req.session", req.session)
//   res.render("products", {user:req.session.userInfo} );
// }); 

router.get("/cambio-password", ViewsController.renderChangePassword);


export {router as viewsRouter};

