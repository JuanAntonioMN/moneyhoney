document.getElementById('proteccion').addEventListener('click', function () {
    var element = document.getElementById('miElemento1');
    if (element) { // Verifica que el elemento exista
        if (element.style.visibility === "hidden") {
            element.style.visibility = "visible"; // Mostrar el elemento
        } else {
            element.style.visibility = "hidden"; // Ocultar el elemento
        }
    } else {
        console.error("El elemento 'miElemento1' no existe en el DOM.");
    }
});


    document.getElementById('asistencia').addEventListener('click', function() {
        var element = document.getElementById('miElemento2');
        if(element){
            if (element.style.visibility === "hidden") {
                element.style.visibility = "visible";  // Mostrar el elemento
            } else {
                element.style.visibility = "hidden";   // Ocultar el elemento
            }
        }
       
    });

    document.getElementById('muerte').addEventListener('click', function() {
        var element = document.getElementById('miElemento3');
        if(element){
            if (element.style.visibility === "hidden") {
                element.style.visibility = "visible";  // Mostrar el elemento
            } else {
                element.style.visibility = "hidden";   // Ocultar el elemento
            }
        }
    });

    document.getElementById('enfermedad').addEventListener('click', function() {
        var element = document.getElementById('miElemento4');
        if(element){
            if (element.style.visibility === "hidden") {
                element.style.visibility = "visible";  // Mostrar el elemento
            } else {
                element.style.visibility = "hidden";   // Ocultar el elemento
            }
        }
    });

    document.getElementById('devolucion').addEventListener('click', function() {
        var element = document.getElementById('miElemento5');
        if(element){
            if (element.style.visibility === "hidden") {
                element.style.visibility = "visible";  // Mostrar el elemento
            } else {
                element.style.visibility = "hidden";   // Ocultar el elemento
            }
        }
    });