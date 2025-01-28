import { login } from './auth.js';

document.querySelector("form").addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevenir que el formulario se envíe normalmente

  const correo = document.getElementById("correo").value;
  const contrasenia = document.getElementById("contrasenia").value;

  // Llamada a la función de login
  await login(correo, contrasenia);
});
