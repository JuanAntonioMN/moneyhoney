// Función para establecer una cookie
export function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000)); // Expira en 'days' días
  const expires = "expires=" + d.toUTCString();
  document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))}; ${expires}; path=/`;
}

// Función para obtener una cookie
export function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) {
      return JSON.parse(decodeURIComponent(c.substring(nameEQ.length, c.length)));
    }
  }
  return null;
}

// Función para eliminar una cookie
export function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}
