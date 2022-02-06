// Variables globales
let prendas = [    
    {
        seccion: 'mujer',
        urlImagen: './img/mujer-cazadora.png',
        prenda: 'CAZADORA DE PIEL FIFY',
        descripcion: 'Cazadora de piel, Cuello solapas, Cierre diagonal, Cinturón a juego, Forro interior.',
        precio: 290,
        tallas: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
        seccion: 'mujer',
        urlImagen: './img/mujer-pantalon.png',
        prenda: 'PANTALÓN JOGGER',
        descripcion: 'Pantalón símil piel, Cintura elástica, Bolsillo trasero, Agarre al tobillo, Fit relajado.',
        precio: 85,
        tallas: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
        seccion: 'mujer',
        urlImagen: './img/mujer-jersey.png',
        prenda: 'JERSEY BÁSICO PHYLLIS',
        descripcion: 'Jersey fluido, Color liso, Detalle canalé en cuello, bajo y mangas, Logo en chapa metálica, ',
        precio: 65,
        tallas: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
        seccion: 'hombre',
        urlImagen: './img/hombre-cazadora.png',
        prenda: 'CAZADORA BIKER PIEL',
        descripcion: 'Cazadora de piel, Cierre cremallera diagonal, Bolsillos y puños con cremalleras metálicas.',
        precio: 250,
        tallas: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
        seccion: 'hombre',
        urlImagen: './img/hombre-camiseta.png',
        prenda: 'CAMISETA BASIC',
        descripcion: 'Camiseta manga corta tejido suave, Color liso, Cuello redondo, Vivo en cuello, Detalle logo, Fit slim.',
        precio: 21,
        tallas: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
        seccion: 'hombre',
        urlImagen: './img/hombre-camisa.png',
        prenda: 'CAMISA PETERLEE',
        descripcion: 'Camisa manga larga, Cierre central abotonado, Puños abotonados, Logo bordado, Cuello abotonado.',
        precio: 250,
        tallas: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
        seccion: 'junior',
        urlImagen: './img/junior-cazadora.png',
        prenda: 'CHAQUETA ECOPIEL',
        descripcion: 'Chaqueta de ecopiel cuello solapa, Detalle logo en relieve, Detalles acolchados, Piel con relieve.',
        precio: 99,
        tallas: ['8', '10', '12', '14', '16', '18']
    },
    {
        seccion: 'junior',
        urlImagen: './img/junior-chaqueta.png',
        prenda: 'CHAQUETA SAHARIANA',
        descripcion: 'Chaqueta corta sahariana, Cierre frontal abotonado, Estampado en el pecho, Tejido asargado, Forro al tono.',
        precio: 95,
        tallas: ['8', '10', '12', '14', '16', '18']
    },
    {
        seccion: 'junior',
        urlImagen: './img/junior-peto.png',
        prenda: 'PETO KAIARESS',
        descripcion: 'Peto vaquero con falda, Fit regular, Bolsillo en el pecho, Lavado índigo, Bolsillos diagonales frontales.',
        precio: 59,
        tallas: ['8', '10', '12', '14', '16', '18']
    }
];
let productosCarrito = [];
let ropaActual = "mujer";
let precioTotal = 0;
let delay = 0;

// Elementos HTML
let carrito = $('carrito');

// Carga del DOM
jQuery(() => {

    // Generar contenido HTML de las prendas
    generarContenidoHTML();

    // Mostrar contenedor de ropa de mujer
    $('#ropa-mujer').show(delay);

    // Controlar enlaces y mostrar el container correspondiente
    $('#enlace-mujer').on('click', () => {
        if (!$('#enlace-mujer').hasClass('active')) {
            activaRopaMujer();
        };
    });
    $('#enlace-hombre').on('click', () => {
        if (!$('#enlace-hombre').hasClass('active')) {
            activaRopaHombre();
        };
    });
    $('#enlace-junior').on('click', () => {
        if (!$('#enlace-junior').hasClass('active')) {
            activaRopaJunior();
        };
    });
    $('#btn-carrito').on('click', () => {
        if (productosCarrito.length > 0){
            toggleCarrito();
        }else {
            alert('El carrito está vacío');
        }
    });

})

// añadir/modificar cantidad del producto del carro HTML. indice = producto del carro a modificar o si es = al length del carro añadir nuevo
function actualizarCarritoHTML(indice){
    if (indice >= productosCarrito.length) {
        agregarAlCarro(indice - 1);
    }else {
        modificarCarritoHTML(indice)
    }
}

// Agregar producto al carro HTML
function agregarAlCarro(indice){
    let talla = productosCarrito[indice].talla;
    let producto = prendas[productosCarrito[indice].id];
    let cantidad = productosCarrito[indice].cantidad;
    let { urlImagen, prenda, precio } = producto;
    let idCard = 'carro' + indice.toString();
    let idCardCantidad = idCard + "cantidad";
    let idCardSubtotal = idCard + "subtotal";
    let idCardRestarCantidad = idCard + "restarcantidad";
    let idCardSumarCantidad = idCard + "sumarcantidad";
    let prendaHTML = '<div id="' + idCard + '"class="card h-auto w-100">';
    prendaHTML += '<div class="row"><div class="col-6">';
    prendaHTML += '<img src="' + urlImagen +'" class="card-img-top mt-3" style="height: 12rem; width: auto"></div>';
    prendaHTML += '<div class="col-6"><div class="card-body text-start">';
    prendaHTML += '<h5 class="card-title">' + prenda + '</h5>';
    prendaHTML += '<p class="card-text"><b>Precio: </b>' + precio + '€</p>';
    prendaHTML += '<p class="card-text"><b>Talla: </b>' + talla + '</p>';
    prendaHTML += '<b class="me-2">Cantidad: </b>';
    prendaHTML += '<a id="' + idCardRestarCantidad + '" onclick="restar(' + indice + ')" href="#" class="btn btn-outline-dark">-</a>';
    prendaHTML += '<span id="' + idCardCantidad + '" class="mx-2 my-0">' + cantidad + '</span>';
    prendaHTML += '<a id="' + idCardSumarCantidad + '" onclick="sumar(' + indice + ')" href="#" class="btn btn-outline-dark">+</a>';
    prendaHTML += '<p class="mt-3 mb-0"><b>Total producto: </b><span id="' + idCardSubtotal + '"class="mx-1 my-0">' + precio + '€</span></p>';
    prendaHTML += '</div></div></div></div>';

    let contenedor = $('#carrito');
    contenedor.append(prendaHTML);
}

// Modificar datos a una prenda que ya está en el carrito HTML
function modificarCarritoHTML(indice){
    let idCardCantidad = '#carro' + indice.toString() + "cantidad";
    let idCardSubtotal = '#carro' + indice.toString() + "subtotal";
    let cantidadHTML = $(idCardCantidad);
    let subtotalHTML = $(idCardSubtotal);
    cantidadHTML.text(productosCarrito[indice].cantidad);
    subtotalHTML.text(productosCarrito[indice].cantidad * prendas[productosCarrito[indice].id].precio + '€');
    textoCarrito();
}

// Sumar 1 a la cantidad de productosCarrito y modificarHTML
function sumar(indice){
    productosCarrito[indice].cantidad++;
    modificarCarritoHTML(indice);
    modificarPrecioTotal();
}
// Restar 1 a la cantidad de productosCarrito y modificarHTML
function restar(indice){
    if (productosCarrito[indice].cantidad > 0){
        productosCarrito[indice].cantidad--;
        modificarCarritoHTML(indice);
        modificarPrecioTotal();
    }
}

// Generar contenido HTML
function generarContenidoHTML(){
    for (let i = 0; i < prendas.length; i++){    
        generarPrendaHTML(i);
    };
}

// Inserta la card HTML de prendas[indice]
function generarPrendaHTML(indice){
    let { urlImagen, prenda, descripcion, precio, tallas } = prendas[indice];    
    let indiceString = indice.toString();
    let nombreInput = indiceString + 'talla';    
    let prendaHTML = '<div class="card col-12 col-md-6 col-lg-4" style="width: 18rem;">';
    prendaHTML += '<img src="' + urlImagen + '" class="card-img-top mt-3">';
    prendaHTML += '<div class="card-body">';
    prendaHTML += '<h5 class="card-title">' + prenda + '</h5>';
    prendaHTML += '<p class="card-text">' + descripcion + '</p>';
    prendaHTML += '<p class="card-text">' + precio.toString() + '€</p>';
    prendaHTML += '<div id="' + indiceString + '" class="row justify-content-center gap-2 mb-2">'
    tallas.forEach((talla) => {
        prendaHTML += '<input type="radio" class="btn-check" id="' + nombreInput + talla.toLocaleLowerCase() + '" name="' + indiceString + 'talla" autocomplete="off" value="' + talla + '"></input>';
        prendaHTML += '<label class="btn btn-outline-dark p-1" style="width: 2rem;" for="' + nombreInput + talla.toLocaleLowerCase() + '">' + talla + '</label>';
    });
    prendaHTML += '</div>'
    prendaHTML += '<a id="agregarProducto" onclick="agregarProducto(' + indiceString + ')" href="#" class="btn btn-success">Añadir al carrito</a>';
    prendaHTML += '</div></div>';

    let contenedor = $('#ropa-' + prendas[indice].seccion);
    contenedor.append(prendaHTML);

}

// Activar el contenedor de ropa correspondiente y cambiar active
function activaRopaMujer() {
    $('#enlace-' + ropaActual).removeClass('active');
    $('#ropa-' + ropaActual).hide(delay);
    $('#enlace-mujer').addClass('active');
    $('#ropa-mujer').show(delay);
    ropaActual = 'mujer';
    ocultarCarrito();
}
function activaRopaHombre() {
    $('#enlace-' + ropaActual).removeClass('active');
    $('#ropa-' + ropaActual).hide(delay);
    $('#enlace-hombre').addClass('active');
    $('#ropa-hombre').show(delay);
    ropaActual = 'hombre';
    ocultarCarrito();
}
function activaRopaJunior() {
    $('#enlace-' + ropaActual).removeClass('active');
    $('#ropa-' + ropaActual).hide(delay);
    $('#enlace-junior').addClass('active');
    $('#ropa-junior').show(delay);
    ropaActual = 'junior';
    ocultarCarrito();
}
// Activar/desactivar contenedor del carrito
function toggleCarrito(){
    let carrito = $('#carrito');
    let resumen = $('#resumen');
    if (carrito.css('display') == 'none') {
        $('#enlace-' + ropaActual).removeClass('active');
        $('#ropa-' + ropaActual).hide(delay);
        carrito.show(delay);
        resumen.show(delay);
    }else{
        $('#enlace-' + ropaActual).addClass('active');
        resumen.hide(delay);
        carrito.hide(delay);
        eliminarCarritoCero();
        $('#ropa-' + ropaActual).show(delay);
    }
}

// Ocultar carrito si está visible
function ocultarCarrito(){
    if ($('#carrito').css('display') != 'none') {
        $('#carrito').hide(delay);
    }
}

// Añadir producto al carrito
function agregarProducto(indicePrenda){
    let talla = $('input[name=' + indicePrenda + 'talla]:checked', '#' + indicePrenda).val();
    if (!talla) {
        alert('Elija talla');
    }else {
        let i = 0;
        let salir = false;
        let enCarro = false;

        while (i < productosCarrito.length && !salir) {
            if (productosCarrito[i].id == indicePrenda && productosCarrito[i].talla == talla) {
                productosCarrito[i].cantidad++;
                enCarro = true;
                salir = true;
            }
            else {
                i++;
            }
        };
        
        if (!enCarro) {            
            productosCarrito.push({ id: indicePrenda, talla: talla, cantidad: 1 });
            i = productosCarrito.length;
        };
        
        actualizarCarritoHTML(i);
        modificarPrecioTotal();
        textoCarrito();
    }
}

// Funcion que modifica el precio total en variable y resumen HTML
function modificarPrecioTotal(){
    precioTotal = 0;
    for (let i = 0; i < productosCarrito.length; i++){
        precioTotal += productosCarrito[i].cantidad * prendas[productosCarrito[i].id].precio
    };
    $('#total').text(precioTotal.toString() + "€");
}

// Cambiar el texto de botón carrito
function textoCarrito(){
    let productos = 0;
    productosCarrito.forEach((productoCarrito) => {
        productos += productoCarrito.cantidad;
    });
    if(productos > 0) {
        $('#btn-carrito').html('Carrito [' + productos + ']');
    }else {
        $('#btn-carrito').html('Carrito');        
    }
}

// Eliminar del array y del html los productos con cantidad 0 al cerrar el carrito
function eliminarCarritoCero(){
    let idCards = [];
    let longitudInicial = productosCarrito.length;

    productosCarrito = productosCarrito.filter((productoCarrito, indice) => {
        if(productoCarrito.cantidad == 0){
            $('#carro' + indice.toString()).remove();
        }else {
            // Guardamos los id de los cards que no están a cero para luego iterar y cambiar poner sus ids correlativos
            idCards.push('#carro' + indice.toString());
        };
        return productoCarrito.cantidad > 0;
    });

    // Reorganizar los ids si se ha borrado algún elemento html del carrito para que sean correlativos
    if (productosCarrito.length != longitudInicial) {
        for (let i = 0; i  < idCards.length; i++) {
            $(idCards[i]).attr('id', 'carro' + i.toString());
            $(idCards[i] + 'cantidad').attr('id', 'carro' + i.toString() + 'cantidad');
            $(idCards[i] + 'subtotal').attr('id', 'carro' + i.toString() + 'subtotal');
            let restar = $(idCards[i] + 'restarcantidad');
            restar.attr('id', 'carro' + i.toString() + 'restarcantidad');
            restar.attr('onclick', 'restar(' + i.toString() + ')');
            let sumar = $(idCards[i] + 'sumarcantidad');
            sumar.attr('id', 'carro' + i.toString() + 'sumarcantidad');
            sumar.attr('onclick', 'sumar(' + i.toString() + ')');
    
        };
    };   

    textoCarrito();
}

// Pagar, vaciar el carrito y cerrarlo
function pagar(){
    alert('Pedido realizado correctamente');
    productosCarrito.forEach((productoCarrito) => {
        productoCarrito.cantidad = 0;
    });
    toggleCarrito();
    eliminarCarritoCero();
}
// Vaciar el carrito
function vaciar(){
    alert('Carrito vacío');
    productosCarrito.forEach((productoCarrito) => {
        productoCarrito.cantidad = 0;
    });
    toggleCarrito();
    eliminarCarritoCero();
}