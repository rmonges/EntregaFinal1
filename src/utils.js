import jwt from "jsonwebtoken";
import path from "path";
import bcrypt from "bcrypt";
import { fileURLToPath } from 'url';
import { faker, Faker, es,en} from "@faker-js/faker";
import { config } from "./config/config.js"


 export const __dirname = path.dirname (fileURLToPath(import.meta.url))


// const SECRET_TOKEN = "secretCoderToken";

// export const generateToken = (infoUser)=>{
//     const token =jwt.sign(infoUser, SECRET_TOKEN);
//     return token;
// }
export const createHash = (password)=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync());//algoritmos que generean las claves para el password   
};

export const isValidPassword = (userDB, password)=>{
    return bcrypt.compareSync(password, userDB.password)
};

export const validateToken = async (token)=>{
    try {
        const info= jwt.verify(token,config.gmail.secretToken);
        return info.email;
    } catch (error) {
        console.log("error con el token", error.message);
        return null; 
    }
}
