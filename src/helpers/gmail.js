import jwt  from "jsonwebtoken";
import { config } from "../config/config.js";
import { gmailTransporter } from "../../src/config/gmail.config.js";

export const generateEmailWithToken = (email, expireTime)=>{
    //genera token
    const token = jwt.sign({email}, config.gmail.secretToken, {expiresIn:expireTime}) ;
    return token;         
};

//funcion de enlace entre con token 
export const recoveryEmail = async (req, userEmail, emailToken)=>{
   try {
    const domain =`${req.protocol}://${req.get('host')}`;
    const link = `${domain}/reset-password?token=${emailToken}`;
    //enviar correo en el enlace
    await gmailTransporter.sendMail({
        from:"Ecommerce Roberto",
        to:userEmail,
        subject:"restablece tu contraseña",
        html: `
        <p>Solicitaste restablecer tu contraseña</p>
        <p>Da click en este enlace:<a href=${link}> Restablece Contraseña <a/></p>` 
    });


    
   } catch (error) {
    console.log(`Hubo un error  ${error.message}`)
   }
}

export const notifEmail = async (req, userEmail)=>{
    try {
     const domain =`${req.protocol}://${req.get('host')}`;
     const link = `${domain}/api/sessions/signup`;
     //enviar correo en el enlace
     await gmailTransporter.sendMail({
         from:"VespaResto&Bar",
         to:userEmail,
         subject:"Session expirada",
         html: `
         <p>Restablece tu session</p>
         <p>Da click en este enlace:<a href=${link}>Logearte<a/></p>` 
     });
 
 
     
    } catch (error) {
     console.log(`Hubo un error  ${error.message}`)
    }
 }
 

