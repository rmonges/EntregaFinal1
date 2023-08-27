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
        clientId:"Iv1.bd15e9455c5bbc04",
        clientSecret:"ee32d2de382880f5c2891855d83cddc00e5341ac",
        callbackUrl:"http://localhost:8080/api/sessions/github-callback"
    },
}