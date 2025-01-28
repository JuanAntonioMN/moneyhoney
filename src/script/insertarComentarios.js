import { enviarComentario,showAlert } from "./alert";


document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevenir el envío normal del formulario
  
    const nombre = document.getElementById("nombre").value;
    const comentario = document.getElementById("comentario").value;
    const red_social = document.getElementById("red_social").value;
    const img = document.getElementById("img").files[0]; // Obtener el archivo de imagen
  
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("comentario", comentario);
    formData.append("red_social", red_social);
    formData.append("img", img); // Agregar la imagen al FormData
  
    try {
      const response = await fetch("http://localhost:3001/insertarComentario", {
        method: "POST",
        body: formData, // Enviar los datos como FormData
      });
  
      const data = await response.json();
  
      if (response.ok) {
        enviarComentario();
      } else {
        showAlert('error','¡Error!','Error al insertar comentario.');
      }
    } catch (error) {
      showAlert('error','¡Error!','Error al insertar comentario.');

    }
  });
  