import { showAlert, showConfirmAlert } from "./alert";

async function eliminarUsuario(id) {
    const opcion=await showConfirmAlert('¿Estás seguro de que deseas eliminar al usuario?', 'Esta operación no se puede deshacer.');
    if (opcion) {
        fetch(`https://moneyhoneyb.onrender.com/eliminarUsuario/${id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            if (data.mensaje === "Usuario eliminado correctamente.") {
              
                showAlert('success','¡Eliminado!','Se elimino al usuario correctamente');

                const libroDiv = document.querySelector(`[data-id="${id}"]`);
                if (libroDiv) libroDiv.remove();
            } else {
                showAlert('error','¡Error!','Ocurrio un error al intentar eliminar al usuario.');

            }
        })
        .catch(error => {
            showAlert('error','¡Error!','Ocurrio un error al intentar eliminar al usuario.');
        });
    }
    else{
        showAlert('info','¡Informacion!','La operación se cancelo con exito.');

    }
}

// Agregar el event listener a los botones de eliminar
document.addEventListener("DOMContentLoaded", function() {
    const eliminarButtons = document.querySelectorAll('[id^="eliminar-"]');
    eliminarButtons.forEach(button => {
        const id = button.id.split('-')[1]; // Obtener el id del libro desde el id del botón
        button.addEventListener('click', function() {
            eliminarUsuario(id); // Pasar el id al método eliminarLibro
        });
    });
});