import { showAlert,showConfirmAlert } from "./alert.js";


 // Función para eliminar un libro
 async function eliminarLibro(id) {
    const opcion=await showConfirmAlert('¿Estás seguro de que deseas eliminar este libro?', 'Esta operación no se puede deshacer.');
    if (opcion) {
        fetch(`https://moneyhoneyb.onrender.com/eliminarLibro/${id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            if (data.mensaje === "Libro y archivos eliminados correctamente.") {
              
              showAlert('success', '¡Eliminado!', 'Libro eliminado correctamente');
                    
                const libroDiv = document.querySelector(`[data-id="${id}"]`);
                if (libroDiv) libroDiv.remove();
                setTimeout(() => {
                    location.reload();  // Recarga la página
                  }, 1000); 

            } else {
              
               showAlert('error', '¡Error!', 'Error al intentar eliminar el libro.');
               setTimeout(() => {
                location.reload();  // Recarga la página
              }, 1000); 
      
            }
        })
        .catch(error => {
            showAlert('error', '¡Error!', 'Error al intentar eliminar el libro.');
            setTimeout(() => {
                location.reload();  // Recarga la página
              }, 1000); 

        });
    }
    else{
        showAlert('info', 'informacion!', 'Operación cancelada.');
        setTimeout(() => {
            location.reload();  // Recarga la página
          }, 1000); 
    }
    
}

// Agregar el event listener a los botones de eliminar
document.addEventListener("DOMContentLoaded", function() {
    const eliminarButtons = document.querySelectorAll('[id^="eliminar-"]');
    eliminarButtons.forEach(button => {
        const id = button.id.split('-')[1]; // Obtener el id del libro desde el id del botón

        button.addEventListener('click', function() {
            eliminarLibro(id); // Pasar el id al método eliminarLibro
           
        });
    });
});