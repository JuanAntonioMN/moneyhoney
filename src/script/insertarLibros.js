import { showAlert } from './alert.js';


document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevenir el envío normal del formulario
  
    const nombre = document.getElementById("nombre").value;
    const descripcion = document.getElementById("descripcion").value;
    const precio = document.getElementById("precio").value;
    const imagen_url = document.getElementById("imagen_url").files[0]; // Obtener el archivo de imagen
    const pdf_url = document.getElementById("pdf_url").files[0]; 
    if (!imagen_url) {
      showAlert('error', '¡Error!', 'Por favor, selecciona una imagen.');
      
      return;
  }

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("precio", precio);
    formData.append("imagen_url", imagen_url);
    formData.append("pdf_url", pdf_url);
     // Agregar la imagen al FormData
  
    try {
      const response = await fetch("https://moneyhoneyb.onrender.com/insertarLibro", {
        method: "POST",
        body: formData, // Enviar los datos como FormData
      });
  
      const data = await response.json();
  
      if (response.ok) {
       
        showAlert('success', '¡Éxito!', 'Libro insertado correctamente.');

      } else {
        
        showAlert('error', '¡Error!', 'Error al insertar el libro.');
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      showAlert('error', '¡Error!', 'Ocurrió un error al intentar insertar el libro.');
      
        
     
    }
  });
  
  
