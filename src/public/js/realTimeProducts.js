const socketClient = io();//instancio socket del lado del cliente

//escucha/recibe y pinto lista de  productos

socketClient.on("productList", (obj)=>{
      updateProducts(obj);
  });

  function updateProducts(products){
      const contenedor= document.getElementById("list-products");
      console.log("conteiner", contenedor);
      console.log("conteinerrrrrr", products);
      let productos ="";
      
      products.forEach((product) => {
          productos +=   `
          <ul class="card-body">Tittle:${product.tittle}<br>
          Description :${product.description}<br>
          Code: ${product.code}<br>
          Price: ${product.price}<br>
          Status: ${product.status}<br>
          Stock: ${product.stock}<br>
          Category: ${product.category}<br>
          Thumbnail: ${product.thumbnail}<br>
          Id: ${product.id} <button  type="submit" id=".btncomp">
          Agregar al Carrito</button></ul> 
          
        `
      
          
      }) 
       console.log(productos)
       contenedor.innerHTML =productos;
    }

//ingreso al Dom, capto id del formulario
document.addEventListener("DOMContentLoaded", () => {
  let form = document.getElementById("form-Product");
 
//leo valores de lod datos cargados
console.log(form)
form.addEventListener("submit", (e)=>{
     e.preventDefault();
     
  let tittle = form.elements.tittle.value; 
  let description = form.elements.description.value;
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

//selecciono boton delet, cuando click capturo y envio el id, actualizo .

document.getElementById("delete-btn").addEventListener("click", function () {
    const deleteidinput = document.getElementById("id-prod");
    const deleteid = parseInt(deleteidinput.value);
    console.log("delete", deleteid)
    socketClient.emit("deleteProduct", deleteid);
    deleteidinput.value = "";
  });
socketClient.on("productosupdated", (obj) => {
  updateProducts(obj);
});

})


const sumarBotonCompra = document.querySelectorAll('.btncomp');

console.log("sumarbtn", sumarBotonCompra)
const tarjetaContenedor = $('.conteinerProducto');
sumarBotonCompra.forEach(sumarboton => {
  sumarboton.addEventListener('click', sumarClick);
console.log(sumarBotonCompra)
});

function sumarClick (event) {

  const button = event.target;
  const item = button.closest('.item-shop');
  
  const itemTitle = item.querySelector('.item-card-title').textContent;

  const itemPrecio = item.querySelector('.item-card-text').textContent;
 
  const itemImagen = item.querySelector('.item-card-img-top').src;



  sumarItem(itemTitle, itemPrecio, itemImagen);
 
} 
