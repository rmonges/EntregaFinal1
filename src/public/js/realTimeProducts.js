const socketClient = io();//instancio socket del lado del cliente


//EVENTO DEL CUAL ENVIO LA INFORMACION

socketClient.on("lista de Productos", (obj)=>{
    updateProducts(obj);
});

function updateProducts(products){
    const container= document.getElementById("list-products");
    console.log("conteiner", container)
    let productos ="";
    products.forEach((product) => {
        productos +=  `  
        <div class="tarj">
            <div class="phill col-12 col-md-4 mb-3">
                <div class="item-card_carro">
                  <img  src= ${itemImagen} class="item-card-img-top"   alt="..."height="120px" width="150px">                
                    <div class="card-body">
                       <h5 class="cart-item-title">${itemTitle}</h5>      
                       <p class="item-precio"><span>${itemPrecio}$</span></p>
                       <div class="cardQty d-flex justify-content-between">
                         <input class="item-cardQtyInput"  type="number"  value="1">
                         <button class="item btn btn-danger botonDelete" " type="button">x</button>
                       </div>
                     </div>
                </div>
                </div>  
    
            </div> `;
    
        
    }); 
        container.innerHTML =productos;
        // const contenedorTarjeta = 
        
        // productoSeleccionado.innerHTML = contenedorTarjeta;
        // const tarjCont = tarjetaContenedor.prepend(productoSeleccionado)
}
//recibir un evento desde el servidor

//  socketClient.on("home", (dataSever)=>{
//      console.log(`datos recibidos del servidor ${dataSever}`);
//     }) 
// socketClient.on("eventoTodosMenosElActual", (data)=>{
//     console.log(`datos para todos ${data}`);
//    })

// socketClient.on("eventoParaTodos", (data)=>{
//     console.log(data);
//    })
   