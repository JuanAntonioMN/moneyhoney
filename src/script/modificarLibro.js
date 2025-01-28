import { showAlert } from "./alert";


document.addEventListener("DOMContentLoaded", function () {
  const modificarBtns = document.querySelectorAll('[id^="modificar-"]');
  modificarBtns.forEach((button) => {
    const id = button.id.split('-')[1]; // Obtener el id del libro desde el id del botón
    const moda = document.querySelector(`#abrirModal-${id}`);
    const closeModal = document.querySelector(`#cerrarModal-${id}`);
    const form = document.querySelector(`#formModificarLibro-${id}`);

    button.addEventListener('click', () => {
      moda.classList.remove("hidden");

      form.addEventListener("submit", (event) => {
        event.preventDefault(); // Evitar el envío por defecto
        const nombre = document.querySelector(`#nombre-nuevo-${id}`).value;
        const descripcion = document.querySelector(`#descripcion-nueva-${id}`).value;
        const img = document.querySelector(`#imagen-nueva-${id}`).files[0];

        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("descripcion", descripcion);
        if (img) {
          formData.append("imagen_url", img);
        }

        modificarElemento(formData,id);
        moda.classList.add("hidden"); 
        
      });
      closeModal.addEventListener('click', () => moda.classList.add("hidden"));
    });
}); 

  

function modificarElemento(formData,id) {


     fetch(`http://localhost:3001/modificarlibros/${id}`, {
        method: "PUT",
        body: formData,
      }).then((response) => {
        if (!response.ok) {
          throw new Error("Error al modificar el libro");
        }
        return response.json();
      })
        .then((data) => {
          showAlert("success", "¡Modificado!", data.mensaje);
          const libroDiv = document.querySelector(`[data-id="${id}"]`);
                if (libroDiv) libroDiv.remove();
                window.location.href = window.location.href;
        })
        .catch((error) => {
          showAlert("error", "¡Error!", "Error al modificar el libro");
        });
      
}

});
      
