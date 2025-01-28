import { showAlert } from "./alert";
document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevenir el envío normal del formulario
  
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const contrasenia = document.getElementById("contrasenia").value;
    const confirmar = document.getElementById("confirmar").value;
    const telefono = document.getElementById("telefono").value;
    const institucion = document.getElementById("institucion").value;
    const edad = document.getElementById("edad").value;
    const sexo = document.getElementById("sexo").value;
    const rol = document.getElementById("rol").value;
    const url_img = document.getElementById("url_img").files[0]; // Obtener el archivo de imagen
  
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("correo", correo);
    formData.append("contrasenia", contrasenia);
    formData.append("telefono", telefono);
    formData.append("institucion", institucion);
    formData.append("edad", edad);
    formData.append("sexo", sexo);
    formData.append("rol", rol);
    formData.append("url_img", url_img); // Agregar la imagen al FormData
  
    try {
      const response = await fetch("https://moneyhoneyb.onrender.com/insertarUsuario", {
        method: "POST",
        body: formData, // Enviar los datos como FormData
      });
  
      const data = await response.json();
  
      if (response.ok) {
        showAlert('success','¡Inserción!',`El usuario ${nombre} se registro con exito.`);

      } else {
        showAlert('error','¡Error!',`Error al insertar al usuario ${nombre}`);

      }
    } catch (error) {
      showAlert('error','¡Error!',`Ocurrió un error al intentar insertar al usuario ${nombre}`);
    }
  });
  