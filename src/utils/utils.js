import jwt from "jsonwebtoken";
import path from "path"
import bcrypt from "bcrypt";
import { fileURLToPath } from 'url';
import { faker, Faker, es,en} from "@faker-js/faker";

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

const {database, commerce, image, string, person} = faker;

const generateProducts = ()=>{
    return {
        id:database.mongodbObjectId(),
        tittle:commerce.productName(),
        price:parseFloat(commerce.price()),
        stock:parseInt(string.numeric(2)),
        image:image.url(),
        code:string.alphanumeric(10),
        description:commerce.productDescription()
    }
}
export const getProducts = ()=>{
const numberOffProducts = 100;
let products = [];
for (let i=0; i<numberOffProducts; i++){
   const newProduct = generateProducts();
   products.push(newProduct); 
};
return {
    id:database.mongodbObjectId(),
    cart:products
   };
};

