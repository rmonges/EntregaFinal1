
$('.botonTotal').css({backgroundColor:"grey"});



const sumarBotonCompra = document.querySelectorAll('.btncomp');


const tarjetaContenedor = $('.conteinerProducto');



sumarBotonCompra.forEach(sumarboton => {
    sumarboton.addEventListener('click', sumarClick);

  });
    
    const botonFinCompra = document.querySelector('.botonFinCompra');
    
    botonFinCompra.addEventListener('click', comprarBotonClicked);
  
   
    


//aplico Fadein..out..animate
/*function  comprarBotonClicked() {
  console.log('hola');
 
 


};*/

function sumarClick (event) {
  

    const x = event.target;
    
    document.getElementById("termo").innerHTML = "MOSTRAR PRUEBA"  ;
    console.log(button);
    const item = button.closest('.item-shop');
    
    const itemTitle = item.querySelector('.item-card-title').textContent;
 
    const itemPrecio = item.querySelector('.item-card-text').textContent;
   
    const itemImagen = item.querySelector('.item-card-img-top').src;

  
  
    sumarItem(itemTitle, itemPrecio, itemImagen);
   
} 



function sumarItem (itemTitle, itemPrecio, itemImagen){


  //No repetir elemento
const elementosTitul = document.querySelectorAll('.cart-item-title')
console.log(elementosTitul.length);
for(let i = 0 ; i < elementosTitul.length ; i++ ){

    if(elementosTitul[i].innerText === itemTitle) {
      const elementQty = elementosTitul[i].parentElement.parentElement.parentElement.querySelector('.item-cardQtyInput').value++;
      calcularTotal();
      return;
      }
}
//pinto las tarjeta
  const productoSeleccionado = document.createElement('div');
  const contenedorTarjeta =  `  
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

        
        productoSeleccionado.innerHTML = contenedorTarjeta;
        const tarjCont = tarjetaContenedor.prepend(productoSeleccionado);

        /*const GuardarDB = () => {
          localStorage.setItem('producto',JSON.stringify(tarjCont));
          console.log(tarjCont);
        }
        
        GuardarDB();*/

        const enJSON = JSON.stringify(tarjCont);
        
       
        localStorage.setItem('producto1', enJSON);
       
      
        $('#toast').html(`<p class= "ptoast">Agregado al carrito</p><ul><li>Nombre:${itemTitle}</li><li> 
         Precio ${itemPrecio}</li>`);
        $('#toast').show();
        $('#toast').slideDown(1000).delay(3500).slideUp(500).sli;

        
        productoSeleccionado.querySelector('.botonDelete').addEventListener('click',eliminarItem);
        productoSeleccionado.querySelector('.item-cardQtyInput').addEventListener('change', cambiarCantidad );  
        console.log(productoSeleccionado);
       
        
        
 
  
  calcularTotal();

 
}

//funcion calcular total

function calcularTotal () {
    let total=0;
    const tarjetaTotal = document.querySelector('.tarjTotal');
    const tarjetaContenedor = document.querySelectorAll('.phill');
   
       tarjetaContenedor.forEach(tarjetaContenedor => {

          const precioProducto = tarjetaContenedor.querySelector('.item-precio');
          console.log(precioProducto);
          
          const precioProductoOnly = Number(precioProducto.textContent.replace('$', '' ));

          const cantidadProducto = tarjetaContenedor.querySelector('.item-cardQtyInput');
          console.log(cantidadProducto.value);

         const valorCantidadProducto = Number(cantidadProducto.value);

          total = total + precioProductoOnly * valorCantidadProducto;
        });
    
        tarjetaTotal.innerHTML = `${total.toFixed(2)}$`;
    
    };        
   
   function eliminarItem(event) {
     const productClicked = event.target.parentElement.parentElement.parentElement.parentElement.parentElement;
     productClicked.remove();
      calcularTotal();
    
  };   
 
  calcularTotal();

function cambiarCantidad (event) {
  const input = event.target;
  if (input.value <= 0) {
    input.value = 1;
  }
  input.value <= 0 ? (input.value = 1) : null;
  calcularTotal();
};


//APLICO AJAX

$('.contenedorPromo').prepend('<p class="pProm">Conocé Nuestros Descuentos!</p>');
$('.promosGafas').append('<button class=" butProm  btn-dark " type="button">CLICK AQUI!!</button>');

$('.butProm').on('click', (e) => {
  $.getJSON('descuentos.json',(respuesta, status) =>{
  if(status ==='success'){
    respuesta.forEach((descuento) => {
      
   $('.contenedorPromo').append(`

   <article class="table__promo">
    <table >
     <tr class="trpromo">
       <th>${descuento.Descripcion}.... Pago </th>
       <th>${descuento.Pago}</th>
     </tr>
    </table>
   </article>`); 
   });
  
    $('.table__promo').fadeIn(500).delay(1500).fadeOut(); 
    
  }
  
  });

});


function comprarBotonClicked (){
  const clearCarrito = document.querySelector('.conteinerProducto');
  console.log(clearCarrito);
 clearCarrito.innerHTML = '';

 $('.conteinerProducto').append(`<form>
 <div class="form-group">
   <label for="exampleInputEmail1">Email address</label>
   <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
   <small id="emailHelp" class="form-text text-muted"</small>
 </div>
 <div class="form-group">
   <label for="exampleInputPassword1">Name</label>
   <input type="name" class="form-control" id="exampleInputPassword1" placeholder="Name & Surname">
 </div>
 
 <button type="submit" class=" btnForm btn-dark">Enviar</button>
</form>`);


$('.btnForm').on('click', (e) =>{
  e.preventDefault();
  clearCarrito.innerHTML = '';
 })

 $('.conteinerProducto').append('<h6  class ="tks"style= "display:none"> Completa el formulario! Te llegara el resumen de tu compra a tu correo</h6>');
 
 
 $("h6").fadeIn().delay(1500);
 $(".tks").animate ({
   fontSize: "2em",
   right: "+=100px",
   borderWidth: "10px",
   }, 

"slow",  
    function(){ 
        console.log("final de animación");
        $("h6").fadeOut(8000)

        
       
           
});
 
  calcularTotal();


 
 
 


}









  

 

 
 
  


 

  

  
    
  
