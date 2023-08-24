
import path from "path"
import bcrypt from "bcrypt";
import { fileURLToPath } from 'url';

export const __dirname = path.dirname (fileURLToPath(import.meta.url))

export const createHash = (password)=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync());//algoritmos que generean las claves para el password   
};

export const isValidPassword = (userDB, password)=>{
    return bcrypt.compareSync(password, userDB.password)
}