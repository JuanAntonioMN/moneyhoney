import { showAlert } from "./alert";


const stripe = Stripe('pk_test_51Qk7yqPQYVOxbV0G7via78Jfr2TITZX7tRFOBG42LnUJHPCNJPJd2BbPtZe3yJCD0qqW4MnwC2OSdvQ9tRg72F6e00Pu7n7G6D');

document.addEventListener("DOMContentLoaded", function () {

 crearBoton();
 cupon();
 gratis();
 cesta();
 agregarCesta();
 
 mostrarCesta();

});


function agregarCesta(){

  const contendor=document.querySelectorAll('[id^="contenedor-"]');
  let libros=[];
 contendor.forEach((btn) => {
   const id = btn.id.split('-')[1];
   const nombre = document.querySelector(`#nombre-${id}`);
   const resenia=document.querySelector(`#resenia-${id}`);
   const precio=document.querySelector(`#precio-${id}`);
   const imagen=document.querySelector(`#imagen-${id}`); 
   const btnAgregar=document.querySelector(`#agregar-${id}`);
   
   if(btnAgregar){ 
    btnAgregar.addEventListener("click",()=>{
     libros=JSON.parse(localStorage.getItem("cesta"))|| [];


      const libro={
        id:id,
        nombre:nombre.innerText,
        reseña:resenia.innerText,
        precio:precio.innerText,
        imagen_url:imagen.src
      } 

      const libroexite=libros.some((libro)=>libro.nombre===nombre.innerText);
      if(libroexite===true){
        location.reload();
      } 
      else{
      libros.push(libro);
      localStorage.setItem("cesta",JSON.stringify(libros));
      libros=JSON.parse(localStorage.getItem("cesta"))|| [];
      location.reload();      
      }
    })
   }
  
 });

 


}


function mostrarCesta(){

  let libros=JSON.parse(localStorage.getItem("cesta"))|| [];
  const totalPagar=document.getElementById("total-pagar");
  const contendorCesta=document.getElementById("contendor-cesta");
  const pagarCesta=document.getElementById("pagarCesta");

  if(libros.length===0){
    contendorCesta.classList.remove("justify-start");
    contendorCesta.classList.add("justify-center");
    contendorCesta.classList.remove("items-start");
    contendorCesta.classList.add("items-center"); 
    const divNoHayLibros=document.createElement("div");
    const pNoHayLibros=document.createElement("p");
    divNoHayLibros.className="w-full flex flex-col justify-center items-center cursor-pointer";
    pNoHayLibros.className="font-opensans text-xl";
    pNoHayLibros.innerText="No hay libros en tu cesta";
    divNoHayLibros.appendChild(pNoHayLibros);
    contendorCesta.appendChild(divNoHayLibros);
    pagarCesta.disabled =true;
  }
  
  libros.forEach((libro,index)=>{
    pagarCesta.disabled =false;
    const divContendor=document.createElement("div");
    const divItems=document.createElement("div");
    const divImagen=document.createElement("div");
    const imagen=document.createElement("img");
    const divTexto=document.createElement("div");
    const nombre=document.createElement("h5");
    const resena=document.createElement("p");
    const divAccion=document.createElement("div");
    const btnEliminar=document.createElement("button");
    const imagenEliminar=document.createElement("img"); 
    const precio=document.createElement("p");


    contendorCesta.appendChild(divContendor);
    divContendor.className="w-full flex flex-col justify-center items-end hover:bg- cursor-pointer hover:shadow-lg hover:-translate-y-2 transition-all ease-out delay-150 duration-700";
    divContendor.appendChild(divItems);
    divItems.className="w-full flex justify-center items-start gap-5 ";
    divItems.appendChild(divImagen);
    divImagen.className="w-2/3";
    imagen.src=libro.imagen_url;
    imagen.alt=libro.nombre;
    divImagen.appendChild(imagen);
    divItems.appendChild(divTexto);
    divTexto.className="flex flex-col justify-start items-start gap-2 w-1/2";
    nombre.innerText=libro.nombre;
    nombre.className="font-opensans font-semibold text-base uppercase";
    divTexto.appendChild(nombre);
    resena.innerText=libro.reseña;
    resena.className="font-opensans text-sm uppercase line-clamp-3";
    divTexto.appendChild(resena);
    divItems.appendChild(divAccion);
    divAccion.className="w-1/3 flex flex-col  justify-center items-center p-5 gap-10";
    btnEliminar.className="w-12 h-12 hover:rounded-full  hover:bg-gray-200 hover:shadow-lg transition-all ease-out delay-75 duration-100 flex justify-center items-center"; 
    imagenEliminar.src="/imagenes/eliminar.svg";
    imagenEliminar.alt="eliminar libro"+libro.nombre;
    imagenEliminar.className="w-1/2 object-contain";
    btnEliminar.appendChild(imagenEliminar);
    precio.innerText=libro.precio;
    precio.className="font-opensans text-lg font-bold";
    divAccion.appendChild(btnEliminar);
    divAccion.appendChild(precio);
    btnEliminar.addEventListener("click",()=>{
      libros.splice(index,1);
      localStorage.setItem("cesta",JSON.stringify(libros));
      divContendor.remove();
      location.reload();
      
    });
  });    
  let total=0;
  libros.forEach((libro)=>{
    let precio=libro.precio.replace(/\D/g, ''); 
    let precioReal=parseFloat(precio)/100;
    total+=precioReal;
  });

  totalPagar.innerText=`$${total}`;
  



}



function pagarCesta(){
  const pagarCesta=document.getElementById("pagarCesta");
  let libros=JSON.parse(localStorage.getItem("cesta"))|| [];

  pagarCesta.addEventListener("click",()=>{
   ordenPagar(libros);
  });

}

pagarCesta();






// Función para verificar el estado del pago
const obtenerEstadoPago = async (session_id) => {
 

  if (session_id) {
   
    
    try {
      // Hacer la solicitud a la API de Stripe para obtener los detalles de la sesión
      const response = await fetch(`https://moneyhoneyb.onrender.com/verificarPago?session_id=${session_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Obtener el tipo de contenido de la respuesta
      const contentType = response.headers.get('Content-Type');

      if (contentType.includes('application/json')) {
        // Si la respuesta es JSON
        const data = await response.json(); // Analizar JSON si es JSON

        if (data.payment_status === 'paid') {
          showAlert('success', '¡Pago exitoso!', 'El pago se ha realizado correctamente');
          
          // Aquí, el frontend debería esperar el archivo ZIP
          const downloadResponse = await fetch(`https://moneyhoneyb.onrender.com/descargarLibros?session_id=${session_id}`);
          
          // Asegurarse de que la respuesta es un archivo
          if (downloadResponse.ok) {
            const blob = await downloadResponse.blob(); // Obtener el archivo como blob

            // Crear un enlace temporal para la descarga
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob); // Crear una URL de objeto para el archivo
            link.download = 'books.zip'; // Establecer el nombre del archivo a descargar
            link.click(); // Ejecutar la descarga

            showAlert('success', '¡Descarga iniciada!', 'Los libros están siendo descargados.');
          } else {
            showAlert('error', '¡Error!', 'No se pudo descargar el archivo.');
          }
        } else {
          showAlert('error', '¡Error!', 'El pago no se ha realizado correctamente');
        }
      } else if (contentType.includes('application/zip')) {
        // Si la respuesta es un archivo ZIP
        const blob = await response.blob(); // Obtener el archivo como blob
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob); // Crear una URL de objeto para el archivo
        link.download = 'books.zip'; // Establecer el nombre del archivo a descargar
        link.click(); // Ejecutar la descarga
        showAlert('success', '¡Descarga iniciada!', 'Los libros están siendo descargados.');
        localStorage.removeItem('cesta');
        // Llamar a la función después de que se haya completado el pago
        limpiarUrl();
        location.reload();      
      } else {
        showAlert('error', '¡Error!', 'Formato de respuesta inesperado');
      }
    } catch (error) {
      showAlert('error', '¡Error!', `Error al verificar el estado del pago: ${error.message}`);
    }
  } else {
    showAlert('error', '¡Error!', 'No se ha encontrado la sesión de pago');
  }
};




// Función para procesar el pago
const ordenPagar = async (libros) => {
  try {
    // Crear la sesión de pago en el backend
    const response = await fetch("https://moneyhoneyb.onrender.com/pagar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: libros }), // Enviar los IDs de los libros
    });

    if (!response.ok) throw new Error("Error al crear la sesión de pago");

    const { id } = await response.json();

    // Redirigir al formulario de pago de Stripe
    const stripeResponse = await stripe.redirectToCheckout({ sessionId: id });

    if (stripeResponse.error) {
      console.error("Error al redirigir a Stripe Checkout:", stripeResponse.error.message);
    }
  } catch (error) {
    console.error("Error en el proceso de pago:", error.message);
  }
};

// Función para obtener el session_id de la URL
const obtenerSessionIdDesdeUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('session_id'); // Devuelve el session_id si está en la URL
};

// Función para verificar el pago solo si el session_id está presente
const verificarPagoDesdeUrl = () => {
  const session_id = obtenerSessionIdDesdeUrl(); // Obtener el session_id de la URL
  if (session_id) {
    obtenerEstadoPago(session_id);  // Llamar a la función de verificación con el session_id
  } else {
    // Mostrar un mensaje o no hacer nada si no se encuentra el session_id
    
  }
};

// Esta función se llama una sola vez cuando la página se carga
window.onload = function () {
  verificarPagoDesdeUrl(); // Verifica el estado del pago al cargar la página
};

function limpiarUrl() {
  // Remover los parámetros de la URL usando el objeto history.replaceState
  const url = new URL(window.location.href);
  url.search = ''; // Eliminar los parámetros de la URL
  window.history.replaceState({}, '', url.toString()); // Actualizar la URL sin los parámetros
}

function CantidadCesta(){
   let libros=JSON.parse(localStorage.getItem("cesta"))|| []; 
   const cantidad=document.getElementById("cantidad");
   const cantidadMovil=document.getElementById("cantidad-movil");
   cantidadMovil.innerText=libros.length;
   cantidad.innerText=libros.length;
}

CantidadCesta();


function cupon() {
  const botonGratis = document.querySelectorAll('[id^="contenedor-"]');

  botonGratis.forEach((btn) => {
    const id = btn.id.split('-')[1];
    const cupon = document.querySelector(`#cupon-${id}`);
    const abrirModal = document.querySelector(`#btn-abrirCupon-${id}`);
    const cerrarModal = document.querySelector(`#btn-cerrarCupon-${id}`);
    const formulario = document.querySelector(`#formularioCupon-${id}`);
    const nombre = document.querySelector(`#nombreCupon-${id}`);
    const email = document.querySelector(`#emailCupon-${id}`);
    const tel = document.querySelector(`#telCupon-${id}`);
    const cuponInfo = document.querySelector(`#cuponData-${id}`);
    const obtencion = "Libro con cupon";


   

    if (cupon) {
      cupon.addEventListener("click", () => {
        if (abrirModal) abrirModal.classList.remove("hidden");
      
      });
    }

    if (cerrarModal) {
      cerrarModal.addEventListener("click", () => {
        if (abrirModal) abrirModal.classList.add("hidden");
      });
    }

    if (formulario) {
      formulario.addEventListener("submit", (event) => {
        event.preventDefault();

       LibroCupon(id, { nombre: nombre.value, email: email.value, telefono: tel.value, metodoObtencion: obtencion, cupon:cuponInfo.value });

       console.log(id,nombre.value,email.value,tel.value,obtencion,cuponInfo.value);
       abrirModal.classList.add("hidden");
       document.querySelector(`#formularioCupon-${id}`).reset();
      });
    }
  });
}


function crearBoton(){
 
  const es = document.querySelectorAll('[id^="contenedor-"]');

  es.forEach((btn) => {
    let clasesGratis=["w-full","lg:w-2/3"," font-semibold"," font-opensans"," text-base"," rounded-[2rem]"," h-12"," shadow-color"," bg-[#D7B9FF]"," text-[#8C52FF]"," hover:border-[1px]"," hover:bg-white"," hover:border-[#D7B9FF]","  transition-all"," ease-out"," delay-150"," duration-150"," shadow-2xl"];
    let clasesPagar=["w-full","lg:w-2/3 ","flex","justify-center","gap-2","items-center"," font-semibold"," font-opensans"," text-base"," rounded-[2rem]"," h-12"," shadow-color"," bg-[#D7B9FF]"," text-[#8C52FF]"," hover:border-[1px]"," hover:bg-white"," hover:border-[#D7B9FF]","  transition-all"," ease-out"," delay-150"," duration-150"," shadow-2xl"];
    let clasesCupon=["w-full","lg:w-2/3"," font-semibold"," font-opensans"," text-sm"," rounded-[2rem]"," hover:border-[1px]"," hover:border-black"," h-12"," hover:shadow-xl"," hover:text-black","  hover:bg-white"," transition-all"," ease-out"," delay-150"," duration-150"];
    const id = btn.id.split('-')[1];
    const estado = btn.getAttribute('data-id');
    const container = document.querySelector(`#contenedor-${id}`);
    const button = document.createElement("button");
    
    if(estado=="1"){
      
      button.id = `gratis-${id}`;
      button.innerHTML = ' Obtener libro';
      button.innerHTML += '<i class="fa-solid fa-download mx-2"></i>';
      button.className = clasesGratis.join(" ");
      button.classList.add();
      container.appendChild(button)
    }

    else{
      const buttonCupon = document.createElement("button");
      
      buttonCupon.id = `cupon-${id}`;
      buttonCupon.innerHTML = '<i class="fa-solid fa-tag"></i>';
      buttonCupon.className = clasesCupon.join(" ");
      buttonCupon.onclick = cupon;
      buttonCupon.innerHTML += '   Tengo un cupón';
      button.id = `agregar-${id}`;
      button.innerHTML = "Añadir a la cesta";
      button.innerHTML +='<svg xmlns="http://www.w3.org/2000/svg" width="22" height="26" viewBox="0 0 20 24"><g fill="none" fill-rule="evenodd" stroke="#8C52FF" stroke-width="1" stroke-linecap="square" transform="translate(.883 1)"><polygon points="18.475 22 18.475 22 0 22 0 5 18.475 5"/><path d="M5.13194444,8 L5.13194444,4 C5.13194444,1.8 6.97944444,0 9.2375,0 L9.2375,0 C11.4955556,0 13.3430556,1.8 13.3430556,4 L13.3430556,8"/></g></svg>';
    
      button.className = clasesPagar.join(" ");
      
      container.appendChild(button)
    
      container.appendChild(buttonCupon);
    }
    
    
  });

  
}


function gratis(){
  
    
  const botonGratis = document.querySelectorAll('[id^="contenedor-"]');

  botonGratis.forEach((btn) => {
    const id = btn.id.split('-')[1];
    const gratis=document.querySelector(`#gratis-${id}`);
    const abrirModal = document.querySelector(`#btn-abrir-${id}`);
    const cerrarModal = document.querySelector(`#btn-cerrar-${id}`);
    const formularioGratis = document.querySelector(`#formulario-${id}`);
    const nombre = document.querySelector(`#nombreLibro-${id}`);
    const email = document.querySelector(`#email-${id}`);
    const tel = document.querySelector(`#tel-${id}`);
    const obtencion="Libro gratis";
    if (gratis) {
      gratis.addEventListener("click", () => {
          if (abrirModal) abrirModal.classList.remove("hidden");
          
      });
    }

    if (cerrarModal) {
        cerrarModal.addEventListener("click", () => {
            if (abrirModal) abrirModal.classList.add("hidden");
        });
    }

    if (formularioGratis) {
        formularioGratis.addEventListener("submit", (event) => {
            event.preventDefault();
            LibroGratis(id,{nombre:nombre.value,email:email.value,telefono:tel.value,metodoObtencion:obtencion});
            console.log(id,nombre.value,email.value,tel.value,obtencion);
            abrirModal.classList.add("hidden");
            document.querySelector(`#formularioGratis-${id}`).reset();
            location.reload();   
        });
    }


  });

}


function LibroGratis(id, data) {
  fetch(`https://moneyhoneyb.onrender.com/libroGratis/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nombre: data.nombre,
      email: data.email,
      telefono: data.telefono,
      metodoObtencion: data.metodoObtencion
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      if (response.status === 403) {
        showAlert('error','¡Error!','No tienes permisos para descargar el libro');
       } else if (response.status === 404) {
       showAlert('error','¡Error!','No se encontró el libro');
       } else if (response.status === 500) {
         showAlert('error','¡Error!','Error al descargar el libro');
       } else if (response.status === 200) {
         showAlert('success','¡Descarga exitosa!','El libro se ha descargado correctamente en tu dispositivo que los disfrutes 😊');
       }

      // Obtener el encabezado Content-Disposition
      const contentDisposition = response.headers.get('Content-Disposition');
      console.log('Content-Disposition:', contentDisposition); // Verifica el valor del encabezado

      let fileName = 'libro_descargado.pdf';  // Valor predeterminado

      // Si el encabezado contiene el nombre del archivo, extraerlo
      if (contentDisposition && contentDisposition.includes('attachment')) {
        const matches = /filename="(.+)"/.exec(contentDisposition);
        if (matches && matches[1]) {
          fileName = matches[1];
        }
      }

      return response.blob().then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = fileName; // Usar el nombre extraído del encabezado
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}


function LibroCupon(id,data){
  fetch(`https://moneyhoneyb.onrender.com/libroCupon/${id}`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      nombre:data.nombre,
      email:data.email,
      telefono:data.telefono,
      metodoObtencion:data.metodoObtencion,
      cupon:data.cupon
    })
  })
  .then((response) => {
   

    if (response.status === 403) {
      showAlert('error','¡Error!','El cupón no es válido');
     } else if (response.status === 404) {
     showAlert('error','¡Error!','No se encontró el libro');
     } else if (response.status === 500) {
       showAlert('error','¡Error!','Error al descargar el libro');
     } else if (response.status === 200) {
       showAlert('success','¡Descarga exitosa!','El libro se ha descargado correctamente en tu dispositivo que los disfrutes 😊');
       const contentDisposition = response.headers.get('Content-Disposition');
       console.log('Content-Disposition:', contentDisposition); // Verifica el valor del encabezado
   
       let fileName = 'libro_descargado.pdf';  // Valor predeterminado
   
       // Si el encabezado contiene el nombre del archivo, extraerlo
       if (contentDisposition && contentDisposition.includes('attachment')) {
         const matches = /filename="(.+)"/.exec(contentDisposition);
         if (matches && matches[1]) {
           fileName = matches[1];
         }
       }
   
       return response.blob().then((blob) => {
         const url = window.URL.createObjectURL(blob);
         const a = document.createElement('a');
         a.style.display = 'none';
         a.href = url;
         a.download = fileName; // Usar el nombre extraído del encabezado
         document.body.appendChild(a);
         a.click();
         window.URL.revokeObjectURL(url);
       });
     }
     else{
      throw new Error('Error en la solicitud');

     }
    // Obtener el encabezado Content-Disposition
   
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}


 
function cesta(){
  const cestaAbrir = document.getElementById("btn-cesta-abrir");
  const botonCesta = document.getElementById("cesta-container");
  const cestaCerrar = document.getElementById("btn-cesta-cerrar");
  const body = document.body;
  cestaAbrir.addEventListener("click", () => {
    botonCesta.classList.remove("hidden");
    botonCesta.classList.remove("transform","translate-x-full");
    botonCesta.classList.add("transform","translate-x-0");
    
    body.style.overflow = "hidden"; 
  });

  cestaCerrar.addEventListener("click", () => {
    
    botonCesta.classList.add("hidden");

    body.style.overflow = ""; 
  });
}




