// Obtener el botón de cerrar sesión
import { logout } from "./auth";

const logoutButton = document.getElementById("logout");
const movil = document.getElementById("logout-movil");


// Manejar el clic en el botón de cerrar sesión
logoutButton.addEventListener("click",logout, () => {
  // Eliminar el token de localStorage


  // Redirigir al usuario a la página de inicio de sesión
  window.location.href = "/login";
});

// Manejar el clic en el botón de cerrar sesión
movil.addEventListener("click",logout, () => {
  // Eliminar el token de localStorage
  localStorage.removeItem('token');

  // Redirigir al usuario a la página de inicio de sesión
  window.location.href = "/login";
});
