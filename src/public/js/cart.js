fetch('/api/carts')
  .then(response => response.json())
  .then(data => {
    // 'data' debería contener los productos del carrito
    // Renderiza los productos en tu página según sea necesario
    console.log(data);
  })
  .catch(error => {
    console.error('Error al obtener productos del carrito:', error);
  });