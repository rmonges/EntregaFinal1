const socketClient = io();

socketClient.on("cartList", (obj)=>{
  upDateCart(obj);
  
 }) 

   

 function upDateCart(carts){
     const contenedor= document.getElementById("list-carts");
     console.log("conteiner", contenedor);
     console.log("conteinerrrrrr", carts)

      let carros ="";
    
     carts.forEach((cart) => {
         carros +=   `
         <ul class="card-body">Tittle:${cart.tittle}<br>
         Description :${cart.description}<br>
         Code: ${cart.code}<br>
         Price: ${cart.price}<br>
         Status: ${cart.status}<br>
         Stock: ${cart.stock}<br>
         Category: ${cart.category}<br>
         Thumbnail: ${cart.thumbnail}<br>
         Id: ${cart.id} </ul> <button class="item-btn btn-dark btncomp" type = "button">
         Comprar
     </button>
       `
      }) 
      console.log(carts)
     contenedor.innerHTML =carros;
   }

//ingreso al Dom, capto id del formulario
document.addEventListener("DOMContentLoaded", () => {
let form = document.getElementById("form-Product");

//leo valores de lod datos cargados
console.log(form)
form.addEventListener("submit", (e)=>{
   e.preventDefault();
   
let tittle = form.elements.tittle.value; 
console.log("tittle", tittle)
let description = form.elements.description.value;
console.log("description", description)
let stock = form.elements.stock.value;
let thumbnail = form.elements.thumbnail.value;
let category = form.elements.category.value;
let price = form.elements.price.value;
let code = form.elements.code.value;
//envio info al servidor
socketClient.emit("addProduct", {
  tittle,
  description,
  stock,
  thumbnail,
  category,
  price,
  code,
});

form.reset();
});

 })
