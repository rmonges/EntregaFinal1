import { Router } from "express";
import { CartsManager } from "../dao/manager/fileSystem/cartsFiles.js";
import { ProductManager} from "../dao/manager/productManager.js";
import { cartsModel } from "../dao/models/carts.model.js";
import { productsModel } from "../dao/models/products.model.js";
import { CartsMongo } from "../dao/manager/mongo/carts.Mongo.js";
import { cartsCollection, productsCollection } from "../constants/index.js";
import { productsDao } from "../../src/dao/index.js"
import { CartsController } from "../controllers/carts.controllers.js";
const cartsService = new CartsMongo ("carts.json");

const router = Router();


router.post("/cartCreated", CartsController.cartCreated);


router.post("/", CartsController.cartCreatedFind);


router.get("/", CartsController.getCarts);

//obtener ruta con populacion
router.get("/prodpopulate/:cid", CartsController.prodPopulateCid);




router.get("/:cid", CartsController.cartporCid);



router.post("/:cid/product/:pid",CartsController.cidProductPid );  

router.put("/addproductCart", CartsController.addproductCart);

router.delete("/:cid", CartsController.deletecid);
router.put("/:cid", CartsController.putporcid);


router.delete("/:cid/product/:pid", CartsController.delteCidProductPid);  
 router.put("/:cid/product/:pid", CartsController.putCidProductPid);  

router.delete("/:cid", CartsController.deleteByCid);


router.delete("/:cid/products",CartsController.deleteCidProducts);


export {router as cartsRouter};