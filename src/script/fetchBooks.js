/*export const fetchBooks = async () => {
    try {
      const response = await fetch("https://moneyhoneyb.onrender.com/libros"); // Asegúrate de que esta URL es la correcta para tu API
      const data = await response.json();
      
      // Si la respuesta es exitosa, devolver los libros
      if (response.ok) {
       
        return data.libros;
      } else {
        throw new Error(data.mensaje || 'Error al obtener los libros');
      }
    } catch (error) {
      console.error('Error al obtener los libros:', error);
      return [];
    }
  };
  
*/



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
          if(libros.estado){
            texto="Poner en venta"
          }else{
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
                <p class="font-opensans font-semibold text-[1.1rem]" id="mostrar-${libros.id}">Cupón: <b class="font-extralight">cupon</b></p>
    
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
        </div
        `;

        // Agregamos el libro al contenedor
        container.appendChild(libroElement);
      });
    } else {
      console.error('Error al obtener los libros:', data.mensaje || 'Error desconocido');
    }
  } catch (error) {
    console.error('Error al obtener los libros:', error);
  }
})
  
        
    
   
