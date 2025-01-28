export const roles = async () => {
    try {
      const response = await fetch('http://localhost:3001/roles'); // Asegúrate de que esta URL es la correcta para tu API
      const data = await response.json();
      
      // Si la respuesta es exitosa, devolver los libros
      if (response.ok) {
        return data.roles;
      } else {
        throw new Error(data.mensaje || 'Error al obtener los roles');
      }
    } catch (error) {
      console.error('Error al obtener los roles:', error);
      return [];
    }
  };
  