const socketClient = io();//instancio socket del lado del cliente


//EVENTE DEL CUAL ENVIO LA INFORMACION

socketClient.emit("messageEvent", `lista de Productos:`);

//recibir un evento desde el servidor

 socketClient.on("home", (dataSever)=>{
     console.log(`datos recibidos del servidor ${dataSever}`);
    }) 
socketClient.on("eventoTodosMenosElActual", (data)=>{
    console.log(`datos para todos ${data}`);
   })

socketClient.on("eventoParaTodos", (data)=>{
    console.log(data);
   })
   