import jwt from "jsonwebtoken";
import path from "path"
import bcrypt from "bcrypt";
import { fileURLToPath } from 'url';

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
}