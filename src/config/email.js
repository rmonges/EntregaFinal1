import nodemailer from "nodemailer";

const adminEmail ="robertoamonges@gmail.com";
const adminPass= "uvzppaoqdlbmttxc";

const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port: 587,
    auth:{
        user:adminEmail,
        pass: adminPass
    },
    secure:false,
    tls:{
        rejectUnaauthorized:false
    }
})

export {transporter }