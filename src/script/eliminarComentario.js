
import { showAlert,showConfirmAlert } from "./alert";
// Función para eliminar un libro
async  function eliminarComentario(id) {

   const validacion=await showConfirmAlert('¿Estás seguro de que deseas eliminar al usuario?', 'Esta operación no se puede deshacer.');
    if (validacion) {
        fetch(`https://moneyhoneyb.onrender.com/eliminarComentario/${id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            if (data.mensaje === "Comentario eliminado correctamente.") {
              
                showAlert('success','Echo','Comentario eliminado correctamente."');

                const comentario = document.querySelector(`[data-id="${id}"]`);
                if (comentario) libroDiv.remove();
                setTimeout(() => {
                    location.reload();  // Recarga la página
                  }, 1000); 
            } else {
                showAlert('error','Error','Ocurrio un error al intentar eliminar el comentario.');

                setTimeout(() => {
                    location.reload();  // Recarga la página
                  }, 1000); 
            }
        })
        .catch(error => {
            showAlert('error','Error','Ocurrio un error al intentar eliminar el comentario.');

             
            setTimeout(() => {
                location.reload();  // Recarga la página
              }, 1000); 
        });
    }
    else{
        showAlert('info','¡Informacion!','La operación se cancelo con exito.');
        setTimeout(() => {
            location.reload();  // Recarga la página
          }, 1000); 
    }
}


    
function eliminarComentarios() {
    
    const eliminarButtons = document.querySelectorAll('[id^="eliminar-"]');

    console.log(containerEliminar);
    eliminarButtons.forEach(button => {
        const id = button.id.split('-')[1]; // Obtener el id del libro desde el id del botón
        console.log(id);
        button.addEventListener('click', function() {
            eliminarComentario(id); // Pasar el id al método eliminarLibro
            
        });
    });
}


eliminarComentarios();