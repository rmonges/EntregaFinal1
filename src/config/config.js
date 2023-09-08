export const config = {
    server:{
        port:8080,
        secretSessions: "claveSecretaSessions"
    },
    mongo:{
        url:"mongodb+srv://rmonges:Manuel2014@cluster0.m5px3yz.mongodb.net/loginUDB?retryWrites=true&w=majority",
        //url:"mongodb+srv://rmonges:Manuel2014@cluster0.m5px3yz.mongodb.net/ecommercetp?retryWrites=true&w=majority"
    },
    github:{
        clientId:" Iv1.fb70c8d2d647f25d",
        clientSecret:"31016392cd23d6ee7c653bf71fd92882a04fc1e5",
        callbackUrl:"http://localhost:8080/api/sessions/github-callback"
    },
}