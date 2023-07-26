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
          <ul>tittle:${product.tittle}<br>
          description :${product.description},<br>
          code: ${product.code}<br>
          price: ${product.price}<br>
          status: ${product.status}<br>
          stock: ${product.stock}<br>
          category: ${product.category}<br>
          thumbnail: ${product.thumbnail}<br>
          id: ${product.id} </ul> 
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

