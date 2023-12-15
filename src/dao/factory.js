
 
// export const contactsDao = new ContactsManagerMemory(); //contactsDao es el objeto para acceder a todas las operaciones con la fuente de datos que elijamos, memoria , DB  o archivos 
//si quiero utilizar los datos de memory desde el index le asigno al Dao de los contactos                                            
//export const contactsDao = new ContactsManagerMemory()  utilizo el dao de memoria                         
import { config } from "../config/config.js";


const persistence = config.server.persistence;
//con la estructura de switch realizaremos las operaciones para determinar con que persistencia vamos a trabajar en el factory

//SEGUNDO: Generamos los Daos

let contactsDao;
let productsDao;
let cartsDao;
let userDao;
let ticketsDao;

console.log('Persistence:', persistence);

switch (persistence) {
    case "mongo":
        const {connectDB} = await import ("../config/dbConnection.js");
        connectDB();
        //PRIMERO:importar manager de mongo, importamos todas las clases
        const {ContactsManagerMongo} = await import("./manager/mongo/contacts.mongo.js");
        contactsDao = new ContactsManagerMongo();//creamos una nueva instancia por cada ingreso del obj dao
        const {ProductsMongo} = await import("../dao/manager/mongo/productsMongo.js");
        productsDao = new ProductsMongo(); 
        const {CartsMongo} =await import("../dao/manager/mongo/carts.Mongo.js")
        cartsDao = new CartsMongo();
        const {UsersMongo} = await import("./manager/mongo/users.mongo.js"); 
        userDao = new UsersMongo();
        const {TicketsMongo} = await import("./manager/mongo/tickets.mongo.js")
        ticketsDao = new TicketsMongo();
        console.log('contactsDao:', contactsDao); // Agrega estas líneas
        console.log('productsDao:', productsDao);
        console.log('cartsDao:', cartsDao);
        console.log('userDao:', userDao);
        console.log('ticketsDao:', ticketsDao);
        break;
    case "memory":
        const {ContactsManagerMemory} = await import("./memory/contacts.memory.js");
        const {ProductsManagerMemory} = await import("./memory/products.memory.js");
        const {TicketsManagerMemory} = await import("./memory/tickets.memory.js");
        contactsDao = new ContactsManagerMemory();
        productsDao = new ProductsManagerMemory();  
        ticketsDao = new TicketsManagerMemory();
        
        break;
    

    default:
        break;
}
export {contactsDao, productsDao, cartsDao, userDao, ticketsDao}