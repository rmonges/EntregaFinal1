import { checkUserAutentificated, showLoginView } from "../middlerwares/auth.js";
import { productsDao } from "../../src/dao/factory.js";
import  { cartsDao } from "../../src/dao/factory.js";
import { UsersService } from "../services/usersService.js";
import { cartsService } from "./carts.controllers.js";
export class ViewsController{
      static renderHome = async(req, res)=>{
        try {
            const productList = await productsDao.getProduct();
        style:"home.css",
        res.render("home",{
           isProduct: productList ? true : false,
           productList,
           });
        } catch (error) {
           res.render("error");
         }
        };
        static renderSignup =  (req,res)=>{
          res.render("signup");
        };
        static renderPerfil = (req, res)=>{
          res.render("profile", {user:JSON.parse(JSON.stringify(req.user))});
        } ;
        static renderLogin =  (req, res)=>{
          res.render("login");
        } ;
        static renderRealtimeProducts = (req, res)=>{
          res.render("realTimeProducts");
         };
        static renderMessages = (req, res)=>{
          res.render("messages")
         };
        static renderCarts = async (req, res)=>{
          res.render("carts");     
          }; 
        static renderLogings = (req, res)=>{
          res.redirect("/login");
        };
        static renderChangePassword = (req, res)=>{
          const token = req.query.token;
          res.render("changePassword",{token});
        };
        static renderForgot = (req, res)=>{
          res.render("forgot-password");
        };
        static renderResetPass = (req,res) =>{
          const token = req.query.token;
          res.render("reset-password", {token});
        };
        static renderUser = async (req, res)=>{
          try {
            const users = await UsersService.getUser();
 
            const simplifiedUsers = users.map(user => ({
                first_name: user.first_name,
                email: user.email,
                rol: user.role,   
                id: user._id.toString()
                
            }));
            
            const data = {
                title: 'Usuarios Autorizados',
                users: simplifiedUsers,
            };
            console.log(data)
          // Renderizar la plantilla 'Users' y pasar los datos
            res.render("Users", data);
          } catch (error) {
            res.status(500).send('Error al renderizar la plantilla de usuarios.');
          }
         
            
          };    
          static renderCartsView = async (req, res) => {
            try {
              // const carritoData = await cartsService.getCarts();
              // console.log("carritoData", carritoData); 
              res.render("carts");
            } catch (error) {
              res.status(500).send('Error al renderizar la vista del carrito.');
            }
          };
        
      }
