

<script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>;

<script>
  function eliminarUsuario(id) {
    $.ajax({
      url: `/api/users/delete/${id}`,
      type: 'DELETE',
      success: function (result) {
        // Manejar el éxito, por ejemplo, actualizar la interfaz de usuario
        console.log(result);
      },
      error: function (error) {
        // Manejar errores, si es necesario
        console.error(error);
      },
    })
  }
</script>