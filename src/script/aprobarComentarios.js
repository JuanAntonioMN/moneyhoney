import { showAlert,showConfirmAlert } from "./alert";
// Función para eliminar un libro
async function modificarComentario(id) {
    const confirmar=await showConfirmAlert('¡Estás seguro de cambiar el estado del comentario!', 'Esta operación se puede deshacer.')
    if (confirmar) {
        fetch("https://moneyhoneyb.onrender.com/aprobarComentario/"+id, {
            method: 'PATCH',
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === "Estado actualizado correctamente") {
              
                showAlert('success','¡Estado!','Se modifico el estado del comentario.');
                const comentario = document.querySelector(`[data-id="${id}"]`);
                if (comentario) libroDiv.remove();
                setTimeout(() => {
                    location.reload();  // Recarga la página
                  }, 1000);  

            } else {
                
                showAlert('error','Error','Ocurrio un error al intentar cambiar el estado del comentario.');
                setTimeout(() => {
                    location.reload();  // Recarga la página
                  }, 1000); 
            }
        })
        .catch(error => {
          
           showAlert('error','Error','Ocurrio un error al intentar cambiar el estado del comentario.');
           setTimeout(() => {
            location.reload();  // Recarga la página
          }, 1000); 
        });
    }
  
}


document.addEventListener("DOMContentLoaded", function() {
    const eliminarButtons = document.querySelectorAll('[id^="modificar-"]');
    eliminarButtons.forEach(button => {
        const id = button.id.split('-')[1]; // Obtener el id del libro desde el id del botón
        console.log("ID obtenido del botón:", id); // Depuración
        button.addEventListener('click', function() {
            modificarComentario(id); // Pasar el id al método eliminarLibro
           
        });
    });
});



  