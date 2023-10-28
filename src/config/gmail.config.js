import nodemailer from "nodemailer";
import { config } from "./config.js";

const adminEmail ="robertoamonges@gmail.com";
const adminPass= "uvzppaoqdlbmttxc";

const gmailTransporter = nodemailer.createTransport({
    service:"gmail",
    port: 587,
    auth:{
        user:config.gmail.account,
        pass:config.gmail.password
    },
    secure:false,
    tls:{
        rejectUnaauthorized:false
    }
})

export {gmailTransporter }