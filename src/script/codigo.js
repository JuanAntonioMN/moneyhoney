document.addEventListener("DOMContentLoaded", async () => {
    try {
      const response = await fetch("https://moneyhoneyb.onrender.com/comentarios");
      const data = await response.json();

      if (response.ok) {
        const comentarios = data.comentarios;
        const container = document.getElementById("comentarios-container");

        // Limpiamos el contenedor antes de agregar nuevos comentarios
        container.innerHTML = '';

        comentarios.forEach((comentario) => {
          const comentarioElement = document.createElement('div');
          comentarioElement.classList.add('p-6', 'rounded', 'shadow-md', 'dark:bg-gray-50');

          // Creamos el contenido de cada comentario
          comentarioElement.innerHTML = `
            <p>${comentario.comentario}</p>
            <div class="flex items-center mt-4 space-x-4">
              <img src="https://moneyhoneyb.onrender.com/uploads/images/coments/${comentario.img}" 
                alt="${comentario.nombre}" class="w-12 h-12 bg-center bg-auto rounded-full dark:bg-gray-500" />
              <div>
                <p class="text-lg font-semibold">${comentario.nombre}</p>
                <a href="${comentario.red_social}" class="text-sm font-bold text-[#8C52FF]" target="_blank">Follow</a>
              </div>
            </div>
          `;

          // Agregamos el comentario al contenedor
          container.appendChild(comentarioElement);
        });
      } else {
        console.error('Error al obtener los comentarios:', data.mensaje || 'Error desconocido');
      }
    } catch (error) {
      console.error('Error al obtener los comentarios:', error);
    }
  })