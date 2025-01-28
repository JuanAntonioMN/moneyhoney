  // Obtener referencias a los elementos
  const openModalBtn = document.getElementById('openModal');
  const closeModalBtn = document.getElementById('closeModal');
  //const closeFooterModalBtn = document.getElementById('closeFooterModal');
  const modal = document.getElementById('modal');

  // Abrir ventana
  openModalBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
  });

  // Cerrar ventana (con botón de la esquina)
  closeModalBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  // Cerrar ventana (con botón del pie de página)
  /*closeFooterModalBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });*/

  // Cerrar ventana al hacer clic fuera del contenido
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });