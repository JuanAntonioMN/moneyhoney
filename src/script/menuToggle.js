
const menuToggle = document.getElementById("menu-toggle");
	
const mobileMenu = document.getElementById("mobile-menu");
const icono=document.getElementById("icono");

menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    
if (icono.classList.contains("fa-bars")) {
  icono.classList.replace("fa-bars", "fa-xmark");
} else {
  icono.classList.replace("fa-xmark", "fa-bars");
}
    
    
});

  // script.js
  document.addEventListener('DOMContentLoaded', function () {
    const botonWhatsApp = document.getElementById('botonWhatsApp');
    let isScrolling;
    
    window.addEventListener('scroll', function () {
      // Muestra el botón al iniciar el scroll
      botonWhatsApp.classList.remove('hidden');
    
      // Borra el temporizador previo
      window.clearTimeout(isScrolling);
    
      // Establece un nuevo temporizador para ocultar el botón después de 2 segundos de inactividad
      isScrolling = setTimeout(function() {
        botonWhatsApp.classList.add('hidden');
      }, 2000);
    });
    });