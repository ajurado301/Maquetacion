// Variables globales
let turnoActual = "X";
let tablero = [];
let gameOver = false;
let ganadasX = 0;
let ganadasO = 0;
let totalPartidas = 0
let ultimoGanador = "";

// ***********************************************
// Función main (cargada en el onload del bogy)
// ***********************************************
function main(){
    let noDragImg = document.getElementsByClassName('cuadro');
    for(img of noDragImg){
        img.draggable = false;
    };
    reinicioTotal();
}
// Fin main

// ***********************************************
// Función de reinicio total
// ***********************************************
function reinicioTotal(){
    turnoActual = "X";
    tablero = [];
    gameOver = false;
    ganadasX = 0;
    ganadasO = 0;
    totalPartidas = 0
    ultimoGanador = "";
    reiniciarTablero();
}
// Fin reinicioTotal

// ***********************************************
// Función para borrar el tablero
// ***********************************************
function reiniciarTablero(){
    let cuadros = document.getElementsByClassName('cuadro');
    for (let cuadro of cuadros) {
        cuadro.src = './img/blanco.png';
    };
    cuadros = document.getElementsByClassName('cuadrodiv');
    for (let cuadro of cuadros) {
        cuadro.classList.remove('borde');
    };

    tablero = ["", "", "", "", "", "", "", "", ""];
    gameOver = false;
    turnoActual = "X";
    mostrarTurno();
    mostrarUltimo();
    mostrarDatos();
}
// Fin reiniciarTablero

// ***********************************************
// Mostrar turno en el DOM
// ***********************************************
function mostrarTurno(){
    let turno = document.getElementById('turno');
    turno.innerHTML = turnoActual;
    if (turnoActual != "X" && turnoActual != "O") {
        turno.style.color = 'green'    
    }else {
        turno.style.color = (turnoActual == "X") ? 'red' : 'blue';
    }
}
// Fin mostrarTurno

// ***********************************************
// Mostrar último ganador
// ***********************************************
function mostrarUltimo(){
    let ultimo = document.getElementById('ultimo');
    ultimo.innerHTML = ultimoGanador;
    if (ultimoGanador.length > 0) {
        ultimo.style.color = (ultimoGanador == "X") ? 'red' : 'blue';
    }
}
// Fin mostrarTurno

// ***********************************************
// Mostrar datos partida
// ***********************************************
function mostrarDatos(){
    let elementoHTML = document.getElementById('ganadasX');
    elementoHTML.innerHTML = ganadasX;
    elementoHTML = document.getElementById('ganadasO');
    elementoHTML.innerHTML = ganadasO;
    elementoHTML = document.getElementById('totalPartidas');
    elementoHTML.innerHTML = totalPartidas;
}
// Fin mostrarDatos


// ***********************************************
// Establece el bacground-color para el elemento que la llama
// ***********************************************
function bgCuadro(cuadro){
    if (!gameOver) {
        cuadro.parentNode.classList.toggle("borde");    
    }
}
// Fin bgCuadro

// ***********************************************
// Poner ficha en el cuadro pinchado
// ***********************************************
function ponerFicha(cuadro) {
    let indice = parseInt(cuadro.classList[0][6]) - 1; 
    if (!gameOver && tablero[indice] == "") {
        cuadro.src = (turnoActual == "X") ? './img/X.png' : './img/O.png';
        tablero[indice] = turnoActual;        
        if (es3EnRaya()) {
            // TODO: Sumar victoria a turno actual
            if (turnoActual == "X") {
                ganadasX++
            }else {
                ganadasO++
            };
            totalPartidas++;
            ultimoGanador = turnoActual;
            turnoActual = "¡¡ 3 en raya !!";
            gameOver = true;
        }else if (tableroLleno()){
            gameOver = true;
            ultimoGanador = "Empate";
            turnoActual = "Reinicie partida";
            totalPartidas++;
            mostrarTurno();
        }else {
            turnoActual = (turnoActual == "X") ? 'O' : 'X';    
        }
        mostrarTurno();
        mostrarUltimo();
        mostrarDatos();
    }
}
// Fin ponerFicha

// ***********************************************
// Comprobar si hay 3 en raya
// ***********************************************
function tableroLleno(){
    let result = false;
    let longitudTablero = 0;
    tablero.forEach((cuadro) => {
        longitudTablero += cuadro.length;
    });
    result = (longitudTablero == 9);
    return result;
}
// Fin tableroLleno

// ***********************************************
// Comprobar si hay 3 en raya
// ***********************************************
function es3EnRaya() {
    let result = false;

    let linea1 = tablero[0] + tablero[1] + tablero[2];
    let linea2 = tablero[3] + tablero[4] + tablero[5];
    let linea3 = tablero[6] + tablero[7] + tablero[8];
    let linea4 = tablero[0] + tablero[3] + tablero[6];
    let linea5 = tablero[1] + tablero[4] + tablero[7];
    let linea6 = tablero[2] + tablero[5] + tablero[8];
    let linea7 = tablero[0] + tablero[4] + tablero[8];
    let linea8 = tablero[2] + tablero[4] + tablero[6];
    
    if ((linea1 == "XXX") || (linea1 == "OOO")) {
        result = true;
        marcarBorde(1);
    }else if ((linea2 == "XXX") || (linea2 == "OOO")) {
        result = true;
        marcarBorde(2);
    }else if ((linea3 == "XXX") || (linea3 == "OOO")) {
        result = true;
        marcarBorde(3);
    }else if ((linea4 == "XXX") || (linea4 == "OOO")) {
        result = true;
        marcarBorde(4);
    }else if ((linea5 == "XXX") || (linea5 == "OOO")) {
        result = true;
        marcarBorde(5);
    }else if ((linea6 == "XXX") || (linea6 == "OOO")) {
        result = true;
        marcarBorde(6);
    }else if ((linea7 == "XXX") || (linea7 == "OOO")) {
        result = true;
        marcarBorde(7);
    }else if ((linea8 == "XXX") || (linea8 == "OOO")) {
        result = true;
        marcarBorde(8);
    };
    
    return result;
}
// Fin es3EnRaya

// ***********************************************
// Marcar borde en la jugada ganadora
// ***********************************************
function marcarBorde(l){
    let cuadros = document.getElementsByClassName('cuadrodiv');

    switch (l) {
        case 1:
            cuadros[0].classList.add('borde');
            cuadros[1].classList.add('borde');
            cuadros[2].classList.add('borde');
            break;
        case 2:
            cuadros[3].classList.add('borde');
            cuadros[4].classList.add('borde');
            cuadros[5].classList.add('borde');
            break;
        case 3:
            cuadros[6].classList.add('borde');
            cuadros[7].classList.add('borde');
            cuadros[8].classList.add('borde');
            break;
        case 4:
            cuadros[0].classList.add('borde');
            cuadros[3].classList.add('borde');
            cuadros[6].classList.add('borde');
            break;
        case 5:
            cuadros[1].classList.add('borde');
            cuadros[4].classList.add('borde');
            cuadros[7].classList.add('borde');
            break;
        case 6:
            cuadros[2].classList.add('borde');
            cuadros[5].classList.add('borde');
            cuadros[8].classList.add('borde');
            break;
        case 7:
            cuadros[0].classList.add('borde');
            cuadros[4].classList.add('borde');
            cuadros[8].classList.add('borde');
            break;
        case 8:
            cuadros[2].classList.add('borde');
            cuadros[4].classList.add('borde');
            cuadros[6].classList.add('borde');
            break;
    }
}
// Fin marcarBorde