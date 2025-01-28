export const fetchComentarios = async () => {
    try {
      const response = await fetch('http://localhost:3001/enviarComentario'); // Asegúrate de que esta URL es la correcta para tu API
      const data = await response.json();
      
      // Si la respuesta es exitosa, devolver los libros
      if (response.ok) {
        return data.comentarios;
      } else {
        throw new Error(data.mensaje || 'Error al obtener los comentarios');
      }
    } catch (error) {
      console.error('Error al obtener los comentarios:', error);
      return [];
    }
  };
  