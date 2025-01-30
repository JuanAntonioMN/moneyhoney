/*export const fetchComentarios = async () => {
    try {
      const response = await fetch("https://moneyhoneyb.onrender.com/enviarComentario"); // Asegúrate de que esta URL es la correcta para tu API
      const data = await response.json();
      
      // Si la respuesta es exitosa, devolver los libros
      if (response.ok) {
        return data.comentarios;
      } else {
        throw new Error(data.mensaje || 'Error al obtener los comentarios');
      }
    } catch (error) {
      console.error('Error al obtener los comentarios:', error);
      return [];
    }
  };*/

  import { showAlert,showConfirmAlert } from "./alert";

  document.addEventListener("DOMContentLoaded", async () => {
    try {
      const response = await fetch("https://moneyhoneyb.onrender.com/comentarios");
      const data = await response.json();

      if (response.ok) {
        const comentarios = data.comentarios;
        const container = document.getElementById("comentarios-admin");

        
        // Limpiamos el contenedor antes de agregar nuevos comentarios
        container.innerHTML = '';

        comentarios.forEach((comentario) => {
          const comentarioElement = document.createElement('div');
          comentarioElement.className="w-full  sm:w-full md:w-full lg:w-[45%] grid grid-rows-4 h-auto   bg-white shadow-md rounded-lg";
         
          // Creamos el contenido de cada comentario
          comentarioElement.innerHTML = `
          <div class="w-full flex p-3 justify-between items-center">
              <div class="w-full px-5 py-2  flex justify-end items-end">
                  <div class="w-full flex   flex-row gap-2   items-center">
                      <img class="w-[2rem] h-[2rem] object-contain rounded-full" src="https://moneyhoneyb.onrender.com/uploads/images/coments/${comentario.img}" alt={nombre}>   
                      <p class=" text-[.8rem] font-opensans">${comentario.nombre}</p>

                  </div>
              </div>
              <a href=${comentario.red_social} target="_blank" class="bg-[#8C52FF]  text-white rounded h-7 px-1  text-center">Follow</a>
          </div>

          <div class="w-full p-3 ">
            <p class="text-justify text-base">${comentario.comentario}</p>
          </div>
        
          <hr class="w-full  bg-gray-300">

          <div class="w-full flex sm:flex-row flex-col justify-around items-center text-[1rem] gap-2 p-2 ">
              <button id="modificar-${comentario.id}" class="w-full sm:w-3/4 p-2  bg-white border-[1px] text-[#8C52FF] border-[#8C52FF]  rounded-[1rem] hover:bg-black hover:border-none hover:text-white transition ease-in delay-75 duration-700">${comentario.estado_comentario ? 'RETIRAR' : 'APROBAR'}</button>
              
              <button id="eliminar-${comentario.id}" class="w-full sm:w-3/4 p-2  border-[1px] border-[#8C52FF] rounded-[1rem] bg-[#8C52FF] hover:bg-[#D7B9FF] text-white hover:text-[#8C52FF] transition ease-in delay-75 duration-700">ELIMINAR</button>
          </div>
        `;
        

      
          // Agregamos el comentario al contenedor
          container.appendChild(comentarioElement);

          let btnEliminar=document.querySelector(`#eliminar-${comentario.id}`);
          btnEliminar.addEventListener("click",()=>{
            eliminarComentario(comentario.id);
          });

          let btnModificar=document.querySelector(`#modificar-${comentario.id}`);
          btnModificar.addEventListener("click",()=>{
            modificarComentario(comentario.id);
          });



        });
      } else {
        console.error('Error al obtener los comentarios:', data.mensaje || 'Error desconocido');
      }
    } catch (error) {
      console.error('Error al obtener los comentarios:', error);
    }
  })


  async function modificarComentario(id) {
    const confirmar=await showConfirmAlert('¡Estás seguro de cambiar el estado del comentario!', 'Esta operación se puede deshacer.')
    if (confirmar) {
        fetch(`https://moneyhoneyb.onrender.com/aprobarComentario/${id}`, {
            method: 'PATCH',
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === "Estado actualizado correctamente") {
              
                showAlert('success','¡Estado!','Se modifico el estado del comentario.');
                const comentario = document.querySelector(`[data-id="${id}"]`);
                if (comentario) libroDiv.remove();
                setTimeout(() => {
                    location.reload();  // Recarga la página
                  }, 1000);  

            } else {
                
                showAlert('error','Error','Ocurrio un error al intentar cambiar el estado del comentario.');
                setTimeout(() => {
                    location.reload();  // Recarga la página
                  }, 1000); 
            }
        })
        .catch(error => {
          
           showAlert('error','Error','Ocurrio un error al intentar cambiar el estado del comentario.');
           setTimeout(() => {
            location.reload();  // Recarga la página
          }, 1000); 
        });
    }
  
}


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




  