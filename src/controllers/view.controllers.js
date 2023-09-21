import { checkUserAutentificated, showLoginView } from "../middlerwares/auth.js";
import { productsDao } from "../../src/dao/index.js";
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
        } 
        static renderLogin =  (req, res)=>{
          res.render("login");
        } 
        static renderRealtimeProducts = (req, res)=>{
          res.render("realTimeProducts");
         }
        static renderMessages = (req, res)=>{
          res.render("messages")
         }
        static renderCarts = (req, res)=>{
          res.render("carts")
          } 
        static renderLogings = (req, res)=>{
          res.redirect("/login");
        }
        static renderChangePassword = (req, res)=>{
          res.render("changePassword");
        }
       
      }
