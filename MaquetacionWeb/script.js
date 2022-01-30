// Variables globales
let solicitudes = [];

// Cuando carga el DOM inicializamos variables
function cargado() {
    // Como cada cambio del js nos vacía el array partimos de un array con datos
    solicitudes = [
        { nombre: "Juan", origen: "Bilbao", destino: "Tenerife", personas: "2", fecha: "2022-08-1" },
        { nombre: "Joel", origen: "Barcelona", destino: "Toscana", personas: "2", fecha: "2022-06-27" },
        { nombre: "Ander", origen: "Gipuzkoa", destino: "Galicia", personas: "3", fecha: "2022-06-27" },
        { nombre: "Jesus", origen: "Madrid", destino: "Mallorca", personas: "4", fecha: "2022-07-15" },
        { nombre: "Jose", origen: "Bilbao", destino: "Malaga", personas: "2", fecha: "2022-8-1" },
        { nombre: "Ana", origen: "Barcelona", destino: "Mallorca", personas: "3", fecha: "2022-07-15" },
        { nombre: "Jesus", origen: "Madrid", destino: "Grecia", personas: "5", fecha: "2022-05-10" }
    ];
    // Mostramos array de solicitudes por consola
    console.log(solicitudes);
}

function enviarSolicitud() {

    let alerta = "";

    let nombre = document.getElementById('nombre');
    let origen = document.getElementById('origen');
    let destino = document.getElementById('destino');
    let personas = document.getElementById('personas');
    let fecha = document.getElementById('fecha');

    if (nombre.value.length == 0) { alerta += "Falta el nombre.\n" };
    if (origen.value.length == 0) { alerta += "Falta el origen.\n" };
    if (destino.value.length == 0) { alerta += "Falta el destino.\n" };
    if (personas.value.length == 0 || personas.value == "0") { 
        alerta += "Personas no puede ser cero.\n";
        personas.value = "";
    };
    if (fecha.value.length == 0) { alerta += "Falta la fecha.\n" };

    solicitudes.forEach((solicitud) => {
        if (solicitud.nombre.toLowerCase() == nombre.value.toLowerCase().trim()) {
            alerta = "Ya existe una solicitud con el nombre: " + nombre.value;
        };
    });
    
    if (alerta.length == 0) {
        let solicitud = { nombre: nombre.value.trim(),
                          origen: origen.value.trim(),
                          destino: destino.value.trim(),
                          personas: personas.value,
                          fecha: fecha.value };
        solicitudes.push(solicitud);
        console.log(solicitudes);
        alerta = "Solicitud registrada en la base de datos.";
        nombre.value = "";
        origen.value = "";
        destino.value = "";
        personas.value = "";
        fecha.value = "";
    }
    
    alert(alerta);
}

function filtrarSolicitudes() {
    let atributo = (document.getElementById('por_nombre').checked) ? "nombre" : "destino";
    let campoClave = document.getElementById('clave');
    let clave = campoClave.value.toLowerCase().trim();
    campoClave.placeholder = `Introduzca ${atributo}`;

    let filtro = solicitudes.filter((solicitud) => {
        return solicitud[atributo].toLowerCase().indexOf(clave) == 0;
    });

    let resultadosHTML = "";
    let resultados = document.getElementById('resultados');
    if (filtro.length > 0 && clave.length > 0) {
        resultadosHTML = `<h4>Filtrado por ${atributo}</h4><table><tr><th>Nombre</th><th>Origen</th><th>Destino</th></tr> `;
        filtro.forEach((solicitud) => {
            resultadosHTML += `<tr><td>${solicitud.nombre}</td><td>${solicitud.origen}</td><td>${solicitud.destino}</td></tr>`;
        });        
        resultados.innerHTML = resultadosHTML + "</table>";
    }else if (clave.length > 0) {
        resultados.innerHTML = `<h4>Filtrado por ${atributo}</h4><p>Sin coincidencias</p>`;
    }else {
        resultados.innerHTML = "";
    }

}