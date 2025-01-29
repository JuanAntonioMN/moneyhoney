/*export const fetchUsuarios = async () => {
    try {
      const response = await fetch("https://moneyhoneyb.onrender.com/usuarios"); // Asegúrate de que esta URL es la correcta para tu API
      const data = await response.json();
      
      // Si la respuesta es exitosa, devolver los libros
      if (response.ok) {
        return data.usuarios;
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
      const response = await fetch("https://moneyhoneyb.onrender.com/usuarios");
      const data = await response.json();

      if (response.ok) {
        const usuario = data.usuarios;
        const container = document.getElementById("container-usuarios");

        // Limpiamos el contenedor antes de agregar nuevos libros
        container.innerHTML = '';

        usuario.forEach((usuario) => {
          const usuarioElement = document.createElement('div');
          usuarioElement.className="bg-white  shadow rounded-lg w-full sm:w-full md:w-5/6  lg:w-1/2 xl:w-1/3 mx-auto";
          
          // Creamos el contenido de cada libro
          usuarioElement.innerHTML = `
           <div class="flex justify-center">
                    
                        <img src="https://moneyhoneyb.onrender.com/uploads/images/users/${usuario.url_img}"  alt=${usuario.nombre} class="rounded-full mx-auto  w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110">
                </div>
                
                <div class="mt-2">
                    <h1 class="font-bold text-center text-3xl text-gray-900">${usuario.nombre}</h1>
                    <p class="text-center text-sm text-gray-400 font-medium">${usuario.resultado}</p>
                    
                    <div class="my-5 px-6 w-full">
                        <button id="eliminar-${usuario.id}" class="text-gray-200  w-full rounded-lg text-center font-medium leading-6 px-6 py-3 bg-[#8C52FF] hover:bg-black hover:text-white">Eliminar usuario</button>
                    </div>
                   

                    <div class="w-full">
                        <h3 class="font-medium text-gray-900 text-left px-6">Información del usuario</h3>
                        <div class="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">
                            <a href="#" class=" border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150 overflow-hidden">
                                <img src="https://avatars0.githubusercontent.com/u/35900628?v=4" alt="" class="rounded-full h-6 shadow-md inline-block mr-2">
                                Institución
                                <span class="text-gray-500 text-xs">${usuario.institucion}</span>
                            </a>
                            
                            <a href="#" class=" border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                                <img src="https://avatars0.githubusercontent.com/u/35900628?v=4" alt="" class="rounded-full h-6 shadow-md inline-block mr-2">
                                   Nombre
                                    <span class="text-gray-500 text-xs">${usuario.nombre}</span>
                            </a>
                            <a href="#" class=" border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                                <img src="https://avatars0.githubusercontent.com/u/35900628?v=4" alt="" class="rounded-full h-6 shadow-md inline-block mr-2">
                                Numero de telefono
                                <span class="text-gray-500 text-xs">${usuario.telefono}</span>
                            </a>

                            <a href="#" class=" border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                                <img src="https://avatars0.githubusercontent.com/u/35900628?v=4" alt="" class="rounded-full h-6 shadow-md inline-block mr-2">
                               correo
                                <span class="text-gray-500 text-xs">${usuario.correo}</span>
                            </a>

                            <a href="#" class=" border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                                <img src="https://avatars0.githubusercontent.com/u/35900628?v=4" alt="" class="rounded-full h-6 shadow-md inline-block mr-2">
                                    Edad
                                    <span class="text-gray-500 text-xs">${usuario.edad}</span>
                            </a>

                            <a href="#" class=" border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                                <img src="https://avatars0.githubusercontent.com/u/35900628?v=4" alt="" class="rounded-full h-6 shadow-md inline-block mr-2">
                               Sexo 
                                <span class="text-gray-500 text-xs">${usuario.sexo}</span>
                            </a>

                           

                           
                            
                        </div>
                    </div>
                </div>
          `;

          // Agregamos el libro al contenedor
          container.appendChild(usuarioElement);
        });
      } else {
        console.error('Error al obtener los libros:', data.mensaje || 'Error desconocido');
      }
    } catch (error) {
      console.error('Error al obtener los libros:', error);
    }
  })  