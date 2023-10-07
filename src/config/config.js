
import dotenv from "dotenv";
dotenv.config();


export const config = {
    server:{
        port:process.env.PORT,
        secretSessions: process.env.SECRET_SESSIONS,
        persistence: process.env.PERSISTENCE, 
    },
    mongo:{
        url:process.env.MONGO_URL//process.env.MONGO_URL
    },

    github:{
        clientId:" Iv1.fb70c8d2d647f25d",
        clientSecret:"31016392cd23d6ee7c653bf71fd92882a04fc1e5",
        callbackUrl:"http://localhost:8080/api/sessions/github-callback"
    },
}
