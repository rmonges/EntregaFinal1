
import { productsModel } from "../dao/models/products.model.js";
import { CartsMongo } from "../dao/manager/mongo/carts.Mongo.js";
import { productsDao } from "../dao/factory.js";
import { ProductsService } from "../services/products.services.js"
import { CartsService } from "../services/carts.services.js";
import { cartsModel } from "../dao/models/carts.model.js";
import { CommandContextImpl } from "twilio/lib/rest/preview/wireless/command.js";
//import { error } from "winston";

export const cartsService = new CartsMongo ("carts.json");

export class CartsController {
    static cartCreated = async (req, res)=>{
        try {
            const newCart = {};
            const cartCreated = await CartsService.cartCreated(newCart);
            res.json({status:"success", data:cartCreated});
        } catch (error) {
            console.log(error.menssage)
            res.json({status:"error", message:"hubo un error al obtener los carritos"})
        }
    }
    static cartCreatedFind =  async (req, res)=>{
        try {
           const cartCreated = await CartsService.cartCreatedFind;
           res.json({status: "succes", data:cartCreated}); 
           
        } catch (error) {
           res.json({status:"error", message:error.message});
        };
   }
   static getCarts = async(req,res)=>{
    try {
        res.send(await CartsService.getCarts());
    } catch (error) {
        res.json({status:"error", message:error.message});
    };
 }
 static prodPopulateCid = async (req, res)=>{
    try {
        const cartId =(req.params.cid);
        const cart = await cartsModel.findById(cartId).populate({
            path: 'products',
            populate: {
                path: 'productId',
                model: productsModel,
                select: 'tittle description code price status stock category thumbnail owner '
            }
        });
    if(!cart){
            return res.send("este curso no existe")
        }
        console.log("CARRRT", cart);
        res.send(cart);
       
   }catch (error) {
        res.json({status:"error", message:error.message});
    };
  }
  static cartporCid = async (req, res)=>{
    try {
        const cartId =(req.params.cid);
        const cart = await CartsService.cartporCid(cartId);
        console.log("CARRRT", cart)
        res.json({status:"success", data:cart});
       
   }catch (error) {
        res.json({status:"error", message:error.message});
    };
 }
 static cidProductPid = async (req, res)=>{
    try {
         const cartId = (req.params.cid);
          const productId =(req.params.pid);
          const result = await CartsService.cidProductPid(cartId, productId);
          res.json({status:"success", data:result})
      }catch (error) {
       res.json({status:"error", message:error.message});
    };
 }
//  static addproductCart = async (req, res) => {
//     try {
//         const cartId = req.body.cartId;
//         const productData = req.body.product;

//         // Fetch the cart from the database
//         const cart = await CartsService.cartporCid(cartId);

//         // Check if the product already exists in the cart
//         const existingProductIndex = cart.products.findIndex(product => product.productId.toString() === productData.id);

//         if (existingProductIndex !== -1) {
//             // If the product already exists, update its quantity
//             cart.products[existingProductIndex].quantity += 1;
//         } else {
//             // If the product is not in the cart, add it
//             cart.products.push({
//                 productId: productData.id,
//                 quantity: 1,
//             });
//         }

//         // Save the updated cart back to the database
//         const updatedCart = await CartsService.upDateCar(cartId, cart);

//         res.json({ status: 'success', data: updatedCart });
//     } catch (error) {
//         console.error('Error al agregar producto al carrito:', error);
//         res.json({ status: 'error', message: 'Hubo un problema al agregar el producto al carrito.' });
//     }
// };
static addproductCart = async (req, res) => {
    try {
        //const cartId = req.params.cid;
        const products = req.body.products;
        console.log("products", products);

        const cart = await CartsService.prodPopulateCid(cartId);

        for (const productData of products) {
            const productId = productData.id;
            const product = await ProductsService.getpid(productId);
            console.log("product", product);

            const productExistIndex = cart.products.findIndex(product => product.productId._id.toString() === productId.toString());
            console.log('productexist', productExistIndex);

            if (productExistIndex !== -1) {
                cart.products[productExistIndex].quantity += 1;
            } else {
                const newProduct = {
                    productId: product,
                    quantity: 1
                };

                cart.products.push(newProduct);
            }
        }

        const cartUpdate = await CartsService.upDateCart(cartId, cart);
        res.json({ status: "success", data: cartUpdate });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
};
//  static addproductCart = async(req, res)=>{
//        try {
//             const cartId = req.params.cid;
//             const productId = req.body.products;
//             console.log("productId", productId)
//             const cart = await CartsService.prodPopulateCid(cartId);
//             const product = await ProductsService.getpid(productId);
//             console.log("product", product)
//             const productExistIndex= cart.products.findIndex(product => product.productId._id.toString() === productId.toString());
//              console.log('productexist', productExistIndex);
//             if (productExistIndex!==-1) {
//                 cart.products[productExistIndex].quantity += 1;
//                  const cartUpdate = await CartsService.upDateCart(cartId, cart);
//                  return res.json({ status: "success", data: cartUpdate });
//                }else{  
//                     const newProduct = {
//                         productId : product,
//                         quantity:1
//                       }
//             cart.products.push(newProduct);
//             const cartUpdate = await CartsService.upDateCart(cartId, cart);
//             res.json({status:"succes", data:cartUpdate})
//          }
//         } catch (error) {
//             res.json({status:"error", message:error.message});
//           };
//     };
    
   static deletecid = async (req, res)=>{
    try {
        const idDel= req.params.cid;
        await cartsModel.deleteOne({_id:idDel})
        res.json( {status:"succes", message:"cart eliminado correctamente "})
    
    }catch (error) {
        res.json({status:"error", message:"error"})
    };
  }
  static putporcid = async (req, res)=>{
    try {
        const cartId = req.params.cid;
        const cartInfo = req.body;
        const cartUpdate = await cartsService.putporcid(cartId, cartInfo);
        res.json({status:"succes", data : cartUpdate})
    } catch (error) {
        res.json({status:"error", message:"error"})
    }
   };
   static delteCidProductPid = async (req, res)=>{
    try {
        const cartId= req.params.cid;//
        const productId= req.params.pid;//

        const cart = await cartsModel.findById(cartId);//me devuelve un json 
        console.log("id carrito", cartId)
        if(!cartId){
             return res.send("este carrito no existe")
        };
        const productIndex = cart.products.findIndex(product => product.productId.toString() === productId);
        if (productIndex === -1) {
            return res.send("Este producto no existe en el carrito");
        }
        cart.products = cart.products.filter(product => product.productId.toString() !== productId);
        cart.save();
        res.send(cart);

    }catch (error) {
        console.error(error);
        res.json({status:"error", message:"error"})
    };
  }
  static putCidProductPid = async (req, res)=>{
    try {
        const cartId= req.params.cid;//
        const productId= req.params.pid;//

        const cart = await cartsModel.findById(cartId);//me devuelve un json 
        console.log("id carrito", cartId)
        if(!cartId){
             return res.send("este carrito no existe ")
        };
        console.log("id carrito", cartId)
        const product = await productsModel.findById(productId);
        console.log("id productoId", product)
        if(!productId){
            return res.send("este producto no existe");
        };
        cart.products.pull({_id:productId});

        console.log("producto encontado del carrito", product)
        cart.save();
        res.send(cart);

    }catch (error) {
        console.error(error);
        res.json({status:"error", message:"error"})
    };
   }
   static deleteByCid = async (req, res)=>{
    try {
        const cartId= req.params.cid;//

        const cart = await CartsService.deleteByCid(cartId);//me devuelve un json 
        console.log("id carrito", cartId)
        if(!cartId){
             return res.send("este carrito no existe ")
        };
        console.log("id carrito", cartId)
        const deletedProducts = cart.filter(product=>product.cartId !== cartId)
    
        res.json({ message: `Se han eliminado ${deletedProducts.length} productos del carrito ${cartId}.` });
        console.log("id productoId", product)
        
       
        
        console.log("producto encontado del carrito", product)
         cart.save();console.log("Producto eliminado del carrito:", cart);
        console.log("Cart eliminado:", cart);
        res.send(cart);

    }catch (error) {
        console.error(error);
        res.json({status:"error", message:"error"})
    };
   };
   static deleteCidProducts = async (req, res) => {
    try {
        const cartId = req.params.cid;

        const cart = await CartsService.deleteCidProducts (cartId);
        if (!cart) {
            return res.send("Este carrito no existe");
        }
        cart.products = [];
        cart.save();
        console.log("Todos los productos eliminados del carrito:", cart);
        res.send(cart);
    } catch (error) {
        console.error(error);
        res.json({ status: "error", message: "error" });
    }
 };
    static renderCarts = async (req, res) => {
        try {
            const productosDelCarrito = req.body.productos;
            console.log("listaProductosrenderCarts", productosDelCarrito);
            if (!productosDelCarrito || productosDelCarrito.length === 0) {
                throw new Error('No hay ningún producto en el carrito para mostrarlo');
            }

            // Procesa los productos como desees    
            console.log("listaaaaasrenderCarts", productosDelCarrito);

            // Renderiza la vista con los productos
            res.render("carts", { productos: productosDelCarrito || [] });
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
            res.status(500).send('Error interno del servidor');
        }
    };
            // const listaProductos = obtenerProductosDelCarrito(req.query.ids);
            // console.log("listaProductosshowcarts", listaProductos)
       

 
 }