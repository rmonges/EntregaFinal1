const socketClient = io();//instancio socket del lado del cliente

//escucha/recibe y pinto lista de  productos

socketClient.on("productList", (obj)=>{
      updateProducts(obj);
  });

  function updateProducts(products){
      const contenedor= document.getElementById("list-products");
      
      let productos ="";
      
      products.forEach((product) => {
          productos +=   `
          <div class="card-body">
          <ul>
            <li>tittle: ${product.tittle}</li>
            <li>description:${product.description}</li>
            <li>code:${product.code}</li>
            <li>price: ${product.price}</li>
            <li>status:${product.status}</li>  
            <li>stock:${product.stock}</li>
            <li>category:${product.category}</li>
            <li>thumbnail:${product.thumbnail}</li>
            <li>_id: ${product._id}</li>
          </ul>
          <button type="submit" id="btncomp" class="btncomp">Agregar al Carrito</button>
        </div>
          `
         })  
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
    const deleteid = deleteidinput.value.trim();
    console.log("delete", deleteid)
    socketClient.emit("deleteProduct", deleteid);
    deleteidinput.value = "";
  });
socketClient.on("productosupdated", (obj) => {
  updateProducts(obj);
});

})
document.addEventListener("DOMContentLoaded", () => {
  // Inicializa el carrito como un arreglo vacío
  let carrito = [];

  // Obtén una referencia al contenedor del carrito en el DOM
  const carritoContainer = document.getElementById("lista-carrito");

  // Agrega un evento click a los botones "Agregar al Carrito" (quita el punto de la clase)
  document.addEventListener("click", (event) => {
    if (event.target && event.target.className === "btncomp") {
      const productElement = event.target.closest(".card-body");
      //how select property of card-body?
      agregarAlCarrito(productElement);
    }
  });

  // Función para agregar un producto al carrito
  function agregarAlCarrito(productElement) {

    console.log("productElement", productElement)
    //Obtiene los datos del producto desde el elemento HTML
   
      const product = {
        title: productElement.querySelector(".card-body li:nth-child(1)").textContent,
        description: productElement.querySelector(".card-body li:nth-child(2)").textContent,
        code: productElement.querySelector(".card-body li:nth-child(3)").textContent,
        price: productElement.querySelector(".card-body li:nth-child(4)").textContent,
        status: productElement.querySelector(".card-body li:nth-child(5)").textContent,
        stock: productElement.querySelector(".card-body li:nth-child(6)").textContent,
        category: productElement.querySelector(".card-body li:nth-child(7)").textContent,
        thumbnail: productElement.querySelector(".card-body li:nth-child(8)").textContent,
        id: productElement.querySelector(".card-body li:nth-child(9)").textContent,
      };
    console.log("product", product)
    // Agrega el producto al carrito
    carrito.push(product);

    // Actualiza la visualización del carrito en el DOM
    actualizarCarritoEnDOM();
  }

  // Función para actualizar la visualización del carrito en el DOM
  function actualizarCarritoEnDOM() {
    // Limpia el contenido previo del carrito
    carritoContainer.innerHTML = "";

    // Recorre los productos en el carrito y agrega cada uno al carrito en el DOM
    carrito.forEach((product) => {
      const productItem = document.createElement("tr");
      productItem.innerHTML = `
        <td><img src="${product.thumbnail}"></td>
        <td >${product.title}</td>
        <td>${product.price}</td>
        <td>${product.stock}</td> 
        <td><button class="remove-from-cart" data-id="${product.id}">Quitar</button></td>
      `;

      carritoContainer.appendChild(productItem);

      // Agrega un evento para quitar el producto del carrito cuando se hace clic en el botón "Quitar"
      productItem.querySelector(".remove-from-cart").addEventListener("click", (event) => {
        const productId = event.target.getAttribute("data-id");
        console.log("dataId", productId)
        quitarDelCarrito(productId);
      });
    });
  }

  // Función para quitar un producto del carrito
  function quitarDelCarrito(productId) {
    carrito = carrito.filter((product) => product.id !== productId);
    actualizarCarritoEnDOM();
  }
});

