import { setCookie, getCookie, deleteCookie } from './sesionUsuario';

// Función para iniciar sesión
export async function login(correo, contrasenia) {
  try {
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correo, contrasenia }),
    });

    const data = await response.json();
    
    if (response.ok) {
      // Guardar los datos del usuario en una cookie
      setCookie('usuario', data.usuario, 7); // Guardamos la cookie por 7 días
      window.location.href = "/libros"; // Redirige a la página deseada
    } else {
      console.error("Credenciales incorrectas", data.mensaje);
    }
  } catch (error) {
    console.error("Error del sistema", error);
  }
}


// Función para obtener los datos del usuario desde las cookies en el cliente
export function getUserFromCookie() {
  const usuario = getCookie('usuario');
  if (usuario) {
    console.log("Datos del usuario desde las cookies:", usuario);
    return usuario;
  } else {
    console.log("No hay usuario en las cookies.");
    return null;
  }
}

// Función para obtener los datos del usuario desde las cookies en el servidor
export function getUserFromServerCookies(request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const cookies = Object.fromEntries(
    cookieHeader.split(';').map(cookie => {
      const [name, ...rest] = cookie.split('=');
      return [name.trim(), decodeURIComponent(rest.join('='))];
    })
  );

  if (cookies.usuario) {
    console.log("Datos del usuario desde el servidor:", cookies.usuario);
    return JSON.parse(cookies.usuario);
  } else {
    console.log("No hay usuario en las cookies del servidor.");
    return null;
  }
}

// Función para verificar si el usuario está autenticado
export function isAuthenticated() {
  const usuario = getCookie('usuario'); // Verificar en las cookies si hay un usuario
  return usuario !== null; // Si existe el usuario, está autenticado
}

// Función para cerrar sesión y eliminar la cookie
export function logout() {
  deleteCookie('usuario');
  window.location.href = "/login"; // Redirige a la página de login
}
