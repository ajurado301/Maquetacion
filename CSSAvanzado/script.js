

function enviar(){
    
    let alerta = "";

    let nombre = document.getElementById('nombre');
    let correo = document.getElementById('correo');
    let consulta = document.getElementById('consulta');

    if (nombre.value.trim().length == 0) { alerta += "Falta el nombre.\n" };
    if (correo.value.trim().length == 0) { alerta += "Falta el correo.\n" };
    if (consulta.value.trim().length == 0) { alerta += "Falta motivo de consulta.\n" };
    
    if (alerta.length == 0) {
        alerta = "Solicitud registrada correctamente.";
        nombre.value = "";
        correo.value = "";
        consulta.value = "";
    }
    
    alert(alerta);

}