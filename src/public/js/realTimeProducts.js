const socketClient = io();//instancio socket del lado del cliente

//escucha/recibe y pinto lista de  productos

socketClient.on("productList", (obj)=>{
      updateProducts(obj);
  });

  function updateProducts(products){
      const contenedor= document.getElementById("list-products");
      console.log("conteiner", contenedor);
      console.log("conteinerrrrrr", products)
      let productos ="";
      
      products.forEach((product) => {
          productos +=   `
          <ul>tittle:${product.tittle},<br>
          description :${product.description},<br>
          code: ${product.code},<br>
          price: ${product.price},<br>
          status: ${product.status}},<br>
          stock: ${product.stock},<br>
          category: ${product.category},<br>
          thumbnail: ${product.thumbnail},<br>
          id: ${product.id} </ul> 
        `
      
          
      }) 
       console.log(productos)
       contenedor.innerHTML =productos;
    }

//

let form = document.querySelectorAll("form-Product");
console.log(form)
form.addEventListener("submit", (e)=>{
     e.preventDefault();
     
  let title = form.elements.title.value;
  let description = form.elements.description.value;
  let stock = form.elements.stock.value;
  let thumbnail = form.elements.thumbnail.value;
  let category = form.elements.category.value;
  let price = form.elements.price.value;
  let code = form.elements.code.value;

  socketClient.emit("addProduct", {
    title,
    description,
    stock,
    thumbnail,
    category,
    price,
    code,
  });

  form.reset();
});

document.getElementById("delete-btn").addEventListener("click", function () {
    const deleteidinput = document.getElementById("id-prod");
    const deleteid = parseInt(deleteidinput.value);
    socketClient.emit("deleteProduct", deleteid);
    deleteidinput.value = "";
  });
socketClient.on("productosupdated", (obj) => {
  updateProducts(obj);
});



//EVENTO DEL CUAL ENVIO LA INFORMACION

// socketClient.on("messageEvent", (obj)=>{
//     updateProducts(obj);
// });

// function updateProducts(products){
//     const container= document.getElementById("list-products");
//     console.log("conteiner", container);
//     let productos ="";
//     products.forEach((product) => {
//         productos +=  `  
//         <div class="tarj">
//             <div class="phill col-12 col-md-4 mb-3">
//                 <div class="item-card_carro">
//                   <img  src= ${itemTitle} class="item-card-img-top"   alt="..."height="120px" width="150px">                
//                     <div class="card-body">
//                        <h5 class="cart-item-title">${itemTitle}</h5>      
//                        <p class="item-precio"><span>${itemPrecio}$</span></p>
//                        <div class="cardQty d-flex justify-content-between">
//                          <input class="item-cardQtyInput"  type="number"  value="1">
//                          <button class="item btn btn-danger botonDelete" " type="button">x</button>
//                        </div>
//                      </div>
//                 </div>
//                 </div>  
    
//             </div> `;
    
        
//     }); 
//     console.log(productos)
//       container.innerHTML =productos;




   
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
   