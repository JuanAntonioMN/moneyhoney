import { showAlert } from './alert.js';

function ApiModificarPrecio(id, precio, es_gratis) {
  fetch(`http://localhost:3001/actualizarLibroPrecio/${id}`, {
    method: 'PUT', // Cambiar a PATCH si es necesario
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: Number(id),
      precio: Number(precio),
      es_gratis: Boolean(es_gratis),
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      return response.json();
    })
    .then((data) => {
      showAlert('success', '¡Éxito!', 'El libro se ha actualizado correctamente.');
      const libroDiv = document.querySelector(`[data-id="${id}"]`);
      if (libroDiv) libroDiv.remove();
      setTimeout(() => {
        location.reload();  // Recarga la página
      }, 1000); 
    })
    .catch((error) => {
      showAlert('error', '¡Error!', 'Error al modificar el precio del libro.');
    });
}


document.addEventListener("DOMContentLoaded", function () {
  const cambiarButtons = document.querySelectorAll('[id^="cambiar-"]');
  cambiarButtons.forEach((button) => {
    const estado = button.getAttribute('data-id');
    const id = button.id.split('-')[1]; // Obtener el id del libro desde el id del botón
    const modal = document.querySelector(`#modal-${id}`);
    const closeModalBtn = document.querySelector(`#cerrar-${id}`);
    const formulario = document.querySelector(`#formulario-${id}`);
    const precio = document.querySelector(`#precio-${id}`);
    const cupon = document.querySelector(`#cupon-${id}`);
    const mostrar = document.querySelector(`#mostrar-${id}`);
    const texto = document.querySelector(`#texto-${id}`);

    if(!mostrar.textContent.trim()){
        mostrar.classList.add("hidden");
    }

    if(estado==="0"){
        cupon.classList.remove("hidden");
        mostrar.classList.remove("hidden");
       
    }
    else{
        cupon.classList.add("hidden");
        mostrar.classList.add("hidden");
        texto.innerHTML="Libro gratis";
        texto.classList.remove("text-[1.1rem]");
        texto.classList.add("text-3xl");
    }

    console.log(estado);
    button.addEventListener('click', () =>{

      if (estado === '0') {
        
        ApiModificarPrecio(id, 0, 1);
        setTimeout(() => {
          location.reload();  // Recarga la página
        }, 1000); 
      }
      else{
        modal.classList.remove("hidden");

        formulario.addEventListener("submit", (event) => {
          event.preventDefault(); // Evitar el envío por defecto
          const nuevoPrecio = parseFloat(precio.value);

          // Validar el precio antes de enviarlo
          if (isNaN(nuevoPrecio) || nuevoPrecio <= 0) {
            alert("Por favor, ingresa un precio válido");
            return;
          }

          ApiModificarPrecio(id, nuevoPrecio, 0); // Establecer como pagado con el nuevo precio
          modal.classList.add("hidden");
          setTimeout(() => {
            location.reload();  // Recarga la página
          }, 1000); 
  
        });
        closeModalBtn.addEventListener('click', () =>   modal.classList.add("hidden"));
       
      }

    });
        
  });
});

