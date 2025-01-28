import { showAlert } from "./alert";

async function cupon(id) {
    try {
        const response = await fetch(`http://localhost:3001/cupon/${id}`, {
            method: 'POST',
        });

        const data = await response.json(); // Esperar la respuesta en formato JSON
       
        // Verificar si el cupón fue actualizado o creado correctamente
        if (data.mensaje === "Cupón actualizado" || data.mensaje === "Nuevo cupón generado") {
            const cupon = data.cupón; // Obtener el cupón de la respuesta

            // Mostrar el cupón con éxito
            showAlert('success', '¡Cupón obtenido!', `Se ha obtenido el cupon correctamente: ${cupon}`);
        } else {
            // Si hay un error, mostrar alerta
            showAlert('error', '¡Error!', 'Ocurrió un error al intentar obtener el cupon');
        }
    } catch (error) {
        // Manejar errores en la petición
        showAlert('error', '¡Error!', 'Ocurrió un error al intentar obtener el cupon');
        console.error('Error:', error);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const cuponBtns = document.querySelectorAll('[id^="cupon-"]');
    cuponBtns.forEach(button => {
        const id = button.id.split('-')[1]; // Obtener el id del libro desde el id del botón
        button.addEventListener('click', function() {
            cupon(id); // Pasar el id al método para obtener el cupón
        });
    });
});

 