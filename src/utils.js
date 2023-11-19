import jwt from "jsonwebtoken";
import path from "path";
import bcrypt from "bcrypt";
import { fileURLToPath } from 'url';
import { faker, Faker, es,en} from "@faker-js/faker";
import { config } from "./config/config.js"
import multer  from "multer";

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
};
const checkvalidFields  = (body)=>{
    const {first_name, email, password} = body;
    if(!first_name || !email || !password){
      return false;
    }
    return true;
  };
  
//filter para nuestra carga de img de perfil
const multerProfileFilter = (req,file,cb)=>{
    const valid = checkvalidFields(req.body);
    if(valid){
        cb(null, true);
    }else{
        cb(null, false);
    };
};

//configuracion para guardar las imagenes de los usuarios
const profileStorage = multer.diskStorage({
    //donde guardo lo archivos
    destination: function(req, file, cb){
        cb(null, path.join(__dirname,"/multer/users/img"))
    },
    //cons que nombre vanis a guardar el archivo
    filename:function(req, file, cb){
       // cb(null,`${req.user.email}-perfil-${file.originalname}` )
       cb(null, `${(req.user && req.user.email) || 'default'}-perfil-${file.originalname}`);
    },
 });
 //creamos el uploader de proffiles images
export const uploaderProfile =  multer({storage:profileStorage, fileFilter:multerProfileFilter});

const productsStorage = multer.diskStorage({
    //donde guardo lo archivos
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, "/multer/products/img"))
    },
    //cons que nombre vanis a guardar el archivo
    filename:function(req, file, cb){
        cb(null,`${req.body.code}-product-${file.originalname}` )
    },
 });
 //creamos el uploader de productos images
export const uploaderProduct = multer({storage:productsStorage});



const documentsStorage = multer.diskStorage({
    //donde guardo lo archivos
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, "/multer/users/documents"))
    },
    //cons que nombre vanis a guardar el archivo
    filename:function(req, file, cb){
        cb(null,`${req.user.email}-documento-${file.originalname}` )
    },
 });
 //creamos el uploader de productos images
export const uploaderDocument = multer({storage:documentsStorage});



