import Swal from 'sweetalert2';

export function showAlert(type, title, text, confirmButtonText = 'Aceptar') {
    let iconType;

    switch (type) {
        case 'success':
            iconType = 'success';
            break;
        case 'error':
            iconType = 'error';
            break;
        case 'warning':
            iconType = 'warning';
            break;
        case 'info':
            iconType = 'info';
            break;
        default:
            iconType = 'question';
    }

    Swal.fire({
        title: title,
        text: text,
        icon: iconType,
        confirmButtonText: confirmButtonText,
        color:"#8C52FF"
    });
}

// Función para mostrar alerta de confirmación
export async function showConfirmAlert(title, text) {
    const result = await Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: false,
      confirmButtonText: 'Sí, proceder',
      cancelButtonText: 'Cancelar',
    });
  
    return result.isConfirmed; // Retorna true si el usuario confirma, false si cancela
  }
  
export function enviarComentario(){
    Swal.fire({
    template: "#my-template",
    showConfirmButton: false,
    timer: 900,  
    color:"#8C52FF",
    allowOutsideClick: false,
    position:"bottom-end",
    animation:true
    });
}