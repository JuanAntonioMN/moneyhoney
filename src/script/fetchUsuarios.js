export const fetchUsuarios = async () => {
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
  