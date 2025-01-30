import { showAlert,showConfirmAlert } from "./alert";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("https://moneyhoneyb.onrender.com/libros");
    const data = await response.json();

    if (response.ok) {
      const libro = data.libros;
      const container = document.getElementById("container-libros");

      // Limpiamos el contenedor antes de agregar nuevos libros
      container.innerHTML = '';

      libro.forEach((libros) => {
        const libroElement = document.createElement('div');
        libroElement.className="flex w-full lg:flex-row  md:flex-col flex-col justify-center items-center sm:items-start px-5 sm:p-0 md:p-0 lg:px-10 gap-5";
        

        let texto="";
          if(libros.es_gratis===1){
            texto="Poner en venta"
          }
          else{
            texto="Poner libro gratis"
          }

          
        // Creamos el contenido de cada libro
        libroElement.innerHTML = `
         <img class="w-full  md:w-full lg:w-[25%]" src="https://moneyhoneyb.onrender.com/uploads/images/books/${libros.imagen_url}" alt=${libros.nombre} id="imagen_url" />
        <div class="w-full flex flex-col lg:px-5 lg:gap-32 md:gap-5 gap-5">
            <article class="flex flex-col w-full sm:gap-5 lg:order-1 md:order-2 order-2">
                <h1 class="font-opensans font-semibold text-[1.5rem]" id="nombre">${libros.nombre}</h1>
                <h2 class="font-opensans font-semibold text-[1.3rem]">Reseña del libro</h2>
                <p class="text-[1.2rem]" id="descripcion">${libros.descripcion}</p>
                <p class="font-opensans font-semibold text-[1.1rem]" id="texto-${libros.id}">Precio del libro: <b class="font-extralight">${libros.precio}</b></p>
                <p class="font-opensans font-semibold text-[1.1rem]" id="mostrar-${libros.id}">Cupón: <b class="font-extralight">${libros.cupon}</b></p>
    
            </article>
            <div class="w-full flex  gap-5 flex-wrap lg:order-2 md:order-1 order-1">
                <button id="modificar-${libros.id}" class="w-full lg:w-[20%] md:w-full bg-[#8C52FF] font-opensans text-white text-[1rem] rounded-[2rem] h-12 p-2 shadow-color hover:bg-[#D7B9FF] hover:text-[#8C52FF] transition-all ease-out delay-150 duration-150">
                    <i class="fa-solid fa-pen-to-square"></i> Modificar libro
                </button>

             <button  id="cambiar-${libros.id}" data-id=${libros.estado}   class="w-full lg:w-[20%] md:w-full hover:bg-[#8C52FF] bg-black font-opensans text-white text-[1rem] rounded-[2rem] h-12 p-2 hover:shadow-color transition-all ease-out delay-150 duration-150">
                   ${texto}
                </button>


                <button  id="cupon-${libros.id}"  class="w-full lg:w-[20%] md:w-full bg-black font-opensans text-white text-[1rem] rounded-[2rem] h-12 p-2 hover:shadow-color transition-all ease-out delay-150 duration-150">
                    <i class="fa-solid fa-receipt"></i> Generar cupón
                </button>

                <button id="eliminar-${libros.id}" class="w-full lg:w-[20%] md:w-full bg-black font-opensans text-white text-[1rem] rounded-[2rem] h-12 p-2 hover:shadow-color hover:bg-[#D7B9FF] hover:text-black transition-all ease-out delay-150 duration-150">
                    <i class="fa-solid fa-trash"></i> Eliminar libro
                </button>
            </div>
        </div>
        

        <section  id="abrirModal-${libros.id}"  class="hidden max-w-4xl px-6 mx-auto bg-white rounded-md shadow-2xl h-auto fixed top-3 left-1/4 z-10 transition-all ease-out delay-150 duration-700">
  
    <button id="cerrarModal-${libros.id}" class="font-opensans text-3xl transition-all ease-out delay-150 duration-1000 absolute right-3 top-1 text-[#8C52FF] hover:text-black" name="cerrar"><i class="fa-solid fa-xmark"></i></button>


<h1 class="text-5xl font-bold text-white  dark:text-[#8C52FF] font-opensans p-4">Ingresa la información correcta</h1>
<form id="formModificarLibro-${libros.id}">
    <div class="grid grid-cols-1 gap-6 mt-4">
        <div>
            <input id="nombre-nuevo-${libros.id}" name="nombre"  type="text" class=" block w-full px-4 py-2 mt-2 text-gray-900 bg-gray-100 rounded-md outline-none" placeholder="Nombre Completo del libro">
        </div>
        
        <div>    
            <textarea id="descripcion-nueva-${libros.id}" name="descripcion"  class="block w-full px-4 py-2 mt-2 text-gray-900 bg-gray-100 rounded-md outline-none" placeholder="Descripción" ></textarea>
        </div>
      
       
      
        <div>
           
          <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div class="space-y-1 text-center">
              <svg class="mx-auto h-12 w-12 text-white" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <div class="flex text-sm">
                <label for="imagen-nueva-${libros.id}" class="relative cursor-pointer bg-white rounded-md font-medium outline-none">
                  <span class="text-lg text-gray-500 font-opensans">Subir imagen del libro*</span>
                  <input id="imagen-nueva-${libros.id}" name="imagen-nueva-${libros.id}" accept="image/*" type="file" class="sr-only">
                </label>
               
              </div>

              
              <p class="text-sm font-opensans text-gray-500">
                PNG, JPG
              </p>
            </div>
          </div>
        </div>
    </div>

    <div class="flex justify-end p-4">
        <button class=" w-full px-6 py-4 leading-5 rounded-lg text-white font-opensans text-xl transition-colors duration-200 transform bg-[#8C52FF] rounded-m ">Enviar información</button>
    </div>
</form>

</section>



<section  id="modal-${libros.id}"  class="hidden max-w-4xl px-6 mx-auto bg-white rounded-md shadow-2xl h-auto fixed top-[40%] left-[55%]">
    <button id="cerrar-${libros.id}" class=" font-opensans text-3xl transition-all ease-out delay-150 duration-1000 absolute -right-3 -top-4 text-[#8C52FF] hover:text-black z-20" name="cerrar"><i class="fa-solid fa-xmark"></i></button>

    <h1 class="text-2xl font-bold text-white  dark:text-[#8C52FF] font-opensans p-4">Ingresa el precio del libro {nombre}</h1>
    <form  id="formulario-${libros.id}">
        <div class="grid grid-cols-1 gap-6 mt-4">
            <div>
                <input  id="precio-${libros.id}"  type="number" class="o block w-full px-4 py-2 mt-2 text-gray-900 bg-gray-100 rounded-md  dark:text-gray-300 outline-none" placeholder="Precio*" required>
            </div>
        </div>
  
        <div class="flex justify-end p-4">
                <button class=" w-full px-6 py-4 leading-5 rounded-lg text-white font-opensans text-xl transition-colors duration-200 transform bg-[#8C52FF] rounded-m ">Poner en venta</button>
        </div>
    </form>
</section>



      
        `;

        // Agregamos el libro al contenedor
        container.appendChild(libroElement);

      
       
        console.log(libros);
      
     
       


        //Boton para modificar el libro
        let btnModificar=document.querySelector(`#modificar-${libros.id}`);
        modificarLibros(btnModificar,libros.id);

        //Boton para cambiar el estado del libro
        let btnCambiar=document.querySelector(`#cambiar-${libros.id}`); 
        cambiarLibros(btnCambiar,libros.id,libros.es_gratis);


        //Boton para generar cupon
        let btnCupon=document.querySelector(`#cupon-${libros.id}`);
        generarCupones(btnCupon,libros.id);

        //Boton para eliminar el libro
        let btnEliminar=document.querySelector(`#eliminar-${libros.id}`);
        eliminarLibros(btnEliminar,libros.id);

      });
    } else {
      console.error('Error al obtener los libros:', data.mensaje || 'Error desconocido');
    }
  } catch (error) {
    console.error('Error al obtener los libros:', error);
  }
});
  
function cambiarLibros(boton,id,estado){
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

if(estado===0){
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

boton.addEventListener('click', () =>{

  if (estado===0) {
    
    ApiModificarPrecio(id, 0, 1);
    setTimeout(() => {
      location.reload();  // Recarga la página
    }, 1000); 
  }
  if(estado===1){
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
 
}


function ApiModificarPrecio(id, precio, es_gratis) {
  fetch(`https://moneyhoneyb.onrender.com/actualizarLibroPrecio/${id}`, {
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



function modificarLibros(boton,id){
  const moda = document.querySelector(`#abrirModal-${id}`);
  const closeModal = document.querySelector(`#cerrarModal-${id}`);
  const form = document.querySelector(`#formModificarLibro-${id}`);


  boton.addEventListener("click",()=>{
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


}

async function modificarElemento(formData,id) {


  fetch(`https://moneyhoneyb.onrender.com/modificarlibros/${id}`, {
     method: "PUT",
     body: formData,
   }).then((response) => {
     if (!response.ok) {
       throw new Error("Error al modificar el libro");
     }
     return response.json();
   })
     .then((data) => {
       
       const libroDiv = document.querySelector(`[data-id="${id}"]`);
             if (libroDiv) libroDiv.remove();
            
             setTimeout(() => {
                location.reload();  // Recarga la página
              },  1000);
     })
     .catch((error) => {
       showAlert("error", "¡Error!", "Error al modificar el libro");
     });
   
}


function eliminarLibros(boton,id){
  boton.addEventListener("click",()=>{
    eliminarLibro(id);
  });
}


function generarCupones(boton,id){

  boton.addEventListener("click",()=>{
    generarCupon(id);
  });

}


async function generarCupon(id) {
  try {
      const response = await fetch(`https://moneyhoneyb.onrender.com/cupon/${id}`, {
          method: 'POST',
      });

      const data = await response.json(); // Esperar la respuesta en formato JSON
     
      // Verificar si el cupón fue actualizado o creado correctamente
      if (data.mensaje === "Cupón actualizado" || data.mensaje === "Nuevo cupón generado") {
          const cupon = data.cupón; // Obtener el cupón de la respuesta

          // Mostrar el cupón con éxito
          showAlert('success', '¡Cupón obtenido!', `Se ha obtenido el cupon correctamente: ${cupon}`);
         setTimeout(() => {
            location.reload();  // Recarga la página
          }, 2000);
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
        
    
   
