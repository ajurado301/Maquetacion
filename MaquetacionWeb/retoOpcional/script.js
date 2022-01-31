const availableColors = ["red", "black", "yellow", "orange", "blue", "purple", "green", "brown", "pink"];
const lightColors = ["lightblue", "lightcoral", "lightcyan", "lightgrey", "lightgreen", "lightpink", "lightsalmon", "lightyellow", "lightseagreen"];
let gameParameters;
let userResponse = [];
let startLevelElement;
let actualLevelElement;
let levelColorContainerElement;
let selectColorContainerElement;

function main() {
    restart();
    startLevelElement = document.getElementById('startLevel');
    actualLevelLivesElement = document.getElementById('actualLevelLives');
    paintTitle();
    refresh();
}

function paintTitle(){
    let textoTitulo = "        JUEGO  SIMON        ";
    contenedorTitulo = document.getElementById('contenedorTitulo');
    for(let i = 0; i < 28; i++){
        let cuadro = document.createElement('div');
        cuadro.innerHTML = textoTitulo[i];
        cuadro.classList.add('colorSquare');
        cuadro.style.backgroundColor = randomColor(lightColors, gameParameters.lightColorsMaxIndex);

        contenedorTitulo.appendChild(cuadro);
    }
    contenedorTitulo.style.display = 'flex';
    bgTitulo();
}

function bgTitulo(){
    let bgIntervalTimeOut = setInterval(() => {
        document.getElementById('contenedorTitulo').childNodes[Math.round(Math.random() * 27)].style.backgroundColor=randomColor(lightColors, gameParameters.lightColorsMaxIndex);
    }, 100);
}

function refresh() {
    actualLevelLivesElement.innerHTML = "Nivel: " + gameParameters.level + " - Vidas: " + gameParameters.lives
    startLevelElement.innerHTML = "Empezar nivel " + gameParameters.level;
    let buttons = document.getElementsByClassName('button');
    for (let button of buttons) {
        button.style.display = 'inline';
    };
    levelColorContainerElement.style.display = 'none';
    selectColorContainerElement.style.display = 'none';
    document.getElementById('verify').style.display = 'none';
    document.getElementById('memorize').innerHTML = "";
}

function restart() {
    gameParameters = {
        level: 1,
        lives: 3,
        numberLevelColors: 3,        
        availableColorsMaxIndex: availableColors.length - 1,
        lightColorsMaxIndex: lightColors.length - 1,
        levelColors: [],
        counter: 5 // Poner a 5
    };
    gameParameters.levelColors = [randomColor(availableColors, gameParameters.availableColorsMaxIndex),
                                  randomColor(availableColors, gameParameters.availableColorsMaxIndex),
                                  randomColor(availableColors, gameParameters.availableColorsMaxIndex)];
    levelColorContainerElement = document.getElementById('levelColorContainer');
    selectColorContainerElement = document.getElementById('selectColorContainer');
}

function randomColor(colors, max) {
    return colors[Math.round(Math.random() * max)];
}

function startLevel() {
    let buttons = document.getElementsByClassName('button');
    for (let button of buttons) {
        button.style.display = 'none';
    };
    paintLevel();
    memorizeTime();
}

function paintLevel() {    
    while (levelColorContainerElement.childNodes.length > 0) {
        levelColorContainerElement.removeChild(levelColorContainerElement.childNodes[0]);
    };
    gameParameters.levelColors.forEach((color) => {
        let levelColor = document.createElement('div');
        levelColor.classList.add('colorSquare');
        levelColor.style.backgroundColor = color;
        levelColorContainerElement.appendChild(levelColor);
    });
    levelColorContainerElement.style.display = 'flex';
}

function delay(){
    return new Promise(resolve => setTimeout(resolve, 1000));
}

async function memorizeTime() {
    let memorizeElement = document.getElementById('memorize');
    for (let i = 0; i < gameParameters.counter; i++) {
        memorizeElement.innerHTML = "Memorice estos colores en: " + (gameParameters.counter - i) + " sg.";
        await delay();
    };
    memorizeElement.innerHTML = "Select the correct colors";
    levelColorContainerElement.childNodes.forEach((childNode) => {
        childNode.style.backgroundColor = '';
    });
    if (selectColorContainerElement.childNodes.length == 0) {
        availableColors.forEach((color) => {
            let selectColor = document.createElement('div');
            selectColor.classList.add('colorSquare');
            selectColor.style.backgroundColor = color;
            selectColor.setAttribute('onclick', "selectColor(this.style.backgroundColor)");
            selectColorContainerElement.appendChild(selectColor);
        });
    }
    selectColorContainerElement.style.display = 'flex';
}

function selectColor(bgColor) {
    let lleno = false;
    for (let [indice, childNode] of levelColorContainerElement.childNodes.entries()) {
        if (childNode.style.backgroundColor == "") {
            childNode.style.backgroundColor = bgColor;
            userResponse.push(bgColor);
            if (indice == levelColorContainerElement.childNodes.length - 1) {
                lleno = true;
            };
            break;
        }        
    };
    if (lleno) {
        document.getElementById('verify').style.display = 'block';
    }
}

function verificar() {
    let errores = userResponse.filter((respuesta, indice) => {
        return respuesta != gameParameters.levelColors[indice];
    });
    if (errores.length == 0) {
        alert("¡¡ Combinación de colores correcta !!");
        sumarNivel();
    }else {
        alert("¡¡ No es correcto !!");
        gameParameters.lives--;
        if (gameParameters.lives == 0) {
            alert("¡¡ Vidas agotadas !!");
            main();
        } else {
            refresh();
        }
    };
    userResponse = [];
}

function sumarNivel() {
    gameParameters.level += 1; 
    if (gameParameters.level <= 10) {
        gameParameters.levelColors.push(randomColor(availableColors, gameParameters.availableColorsMaxIndex));
        refresh();
    } else {
        alert("¡¡ Enhorabuena !!\n¡¡ has superado los 10 niveles !!");
        main();
    }
}