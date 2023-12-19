import passport from "passport";
import LocalStrategy from "passport-local"; 
import { createHash, isValidPassword } from "../utils.js";
import {userDao} from "../dao/factory.js";
import githubStrategy from "passport-github2"
import { config } from "./config.js";
import { UsersService } from "../services/usersService.js";


export const initializaPassport = ()=>{//creamos estrategias
    passport.use("signupStrategy", new LocalStrategy(
    {
        usernameField:"email",//le pasao el valor del campo que tiene username,
        passReqToCallback:true, //le pasamos todos los otros valores que tiene el formulario atravex de req.
    },
    //creo una funcion para chequear los datos recibidos
   async (req,username, password, done)=>{//done: funcion que genera el resultado final del registro si esta bien o no
       try {
          const {first_name, last_name, age} = req.body;
          //vericar si existe usuraio
          console.log("username", username);
          const user = await UsersService.getUserByEmail(username);
          if(user){
            return done(null, false);//existe usuario
          }
       
          let role ="user";
          if(username.endsWith("@aerolineas.com.ar")){
             role="admin";           
           }          
          const newUser = {
            first_name: first_name,
            email: username,  
            password:createHash(password),
            role:role,
            avatar:req.file.filename,
           }
           const userCreated = await UsersService.userCreated(newUser);
           return done (null,userCreated);//passport completa proceso de  la session del usuario satisfactoriamente
       } catch (error) {
            return done(error)
       }
    }
    ));

    passport.use("loginStrategy", new LocalStrategy(
        {
        usernameField:"email"
        },
   
        async(username, password, done)=>{
           try {
               console.log("username52", username);
                const user = await UsersService.getUserByEmail(username)
                 console.log("user loginstrategy",user)
              if(!user){
                return done(null, false);
              }
              if(isValidPassword(user,password)){
                user.last_connection = new Date();
                await UsersService.updateUser(user._id, user);
               return done(null,user);
              }else{
                return done(null, false)
            }
          }catch (error) {
            return done(error)
            }
        }
    ));
    passport.use("githubLoginStrategy", new githubStrategy(
      {
        clientID:config.github.clientId,
        clientSecret:config.github.clientSecret,
        callbackUrl:config.github.callbackUrl
      },
      async(accesstoken, refreshToken, profile, done)=>{
        try {
         console.log("profile", profile); 
         const user = await UsersService.getUserByEmail(profile.username)
         if(!user){
           const newUser= {
             first_name: ' ',
             email: profile.username,  
             password:createHash(profile.id)
           }
           const userCreated = await userDao.save(newUser);
            return done (null,userCreated);//passport completa p
        }else{
           return done(null, user)
      }
        }catch (error) {
          return done(error);
        }
      }
    ))
        


    //serializacion y deserealizacion : sirve para crear una session para cada usuario para mejor identificacion al trabajar con muchos usuarios 
    passport.serializeUser((user, done)=>{
        done(null, user._id);
    })
    passport.deserializeUser((async(id, done)=>{//verifica si un usuario tiene una session activa
      try {
        const user = await UsersService.getById(id);//si es asi , extrae su id y lo busca en la BD , trae ese usuario 
        done(null, user)// y lo agrega en el objeto "req.user".---->session .maneja informacion de todos los datos del usuario

      } catch (error) {
        done(error, null);
      }
        
    }))
}

  