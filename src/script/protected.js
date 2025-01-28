// panel.js (Este script se carga en las páginas protegidas)

import { isAuthenticated } from './auth.js';

window.onload = function() {
  if (!isAuthenticated()) {
    // Si el usuario no está autenticado, redirige al login
    window.location.href = '/login'; // Redirige a la página de login
  }

  // El resto de la lógica para la página protegida
};
