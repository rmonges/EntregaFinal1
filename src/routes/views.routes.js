import { Router } from "express"
import { ProductManager } from "../productManager.js";
import { __dirname } from "../utils.js";
import path from "path";
const productsService = new ProductManager ('../src/products.json')
const router = Router();
//const socketClient = io();
//socketClient.emit("messageEvent", `lista de Productos:`);

const food = [
  {name: "Hamburguesa", price:200},
  {name: "Pizza", price:400},
  {name: "Hotdog", price:260},
  {name: "Sosa", price:120},
];



router.get("/realTimeProducts", async (req, res)=>{
  try {
      const productList = await productsService.getProduct();
      const newInfo = {
        tittle:"campera",
        description :"verano",
         code: "34",
         price: "23000",
         status: "true",
         stock: "56",
         category: "deportiva",
         thumbnail: "thumbnail",
         
       }
       if(!productList){
         await productsService.addProduct (newInfo);
         await productsService.upDateProduct();
         productList.push(newProduct);
       }
  
  res.render("realTimeProducts",{
     isProduct: productList ? true : false,
     productList,
     
     });
     socketClient.emit("messageEvent", `lissssssssta de Productos:${productList}`);
  } catch (error) {
     //res.render("error");
  }

})
  
router.post("/product", async (req, res)=>{
  try {
    
    
      const newProduct = {
        name:"pepe",
        lastname:"perez",
        age:"20",
      }
      res.render("/newProduct",newProduct )
  
  } catch (error) {
    
  }
    
})

router.get("/home", async (req, res)=>{
  try {
      const productList = await productsService.getProduct();
      console.log("productlist", productList);
  style:"home.css",
  res.render("home",{
     isProduct: productList ? true : false,
     productList,
     
  });
  } catch (error) {
     res.render("error");
  }

})


router.get("/perfil", (req, res)=>{

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

router.get("/comida", (req, res)=>{
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




export {router as viewsRouter};

