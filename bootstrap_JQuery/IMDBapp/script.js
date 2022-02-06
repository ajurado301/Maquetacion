// Varibles varias
let ultimoActivo = "peliculas";

//***************************************************************************
// Generamos una base de datos en memoria con 3 películas
//***************************************************************************
// Instanciar Professional
let actor1 = new Professional("Charlize Theron", 46, "Femenino", 58, 177, "Rubio", "Azul", "Caucásica", false, "Sudafricana", 1, "Actor", "./img/charlize.png");
let actor2 = new Professional("Keanu Reeves", 57, "Masculino", 82, 186, "Negro", "Negro", "Caucásica", false, "Libanesa", 0, "Actor", "./img/keanu.png");
let actor3 = new Professional("Uma Thurman", 51, "Femenino", 71, 180, "Rubio", "Azul", "Caucásica", false, "Estadounidense", 0, "Actor", "./img/uma.png");
let actor4 = new Professional("Laurence John Fishburne", 60, "Masculino", 87, 184, "Calvo", "Negro", "Negra", false, "Estadounidense", 0, "Actor", "./img/laurence.png");
let actor5 = new Professional("Carrie-Anne Moss", 54, "Femenino", 57, 173, "Negro", "Negro", "Caucásica", false, "Canadiense", 0, "Actor", "./img/carrie.png");
let director1 = new Professional("Lana Wachowski", 56, "Femenino", 70, 179, "Rojo", "Negro", "Caucásica", false, "Estadounidense", 0, "Director", "./img/lana.png");
let director2 = new Professional("James Cameron", 67, "Masculino", 81, 187, "Blanco", "Gris", "Caucásica", false, "Canadiense", 3, "Director", "./img/james.png");
let guionista1 = new Professional("Lilly Wachowski", 54, "Femenino", 92, 173, "Rubio", "Castaño", "Caucásica", false, "Estadounidense", 0, "Guionista", "./img/lilly.png");
let guionista2 = new Professional("Quentin Tarantino", 58, "Masculino", 92, 185, "Marrón oscuro", "Café", "Caucásica", false, "Estadounidense", 2, "Guionista", "./img/quentin.png");
let productor = new Professional("Joel Silver", 69, "Masculino", 84, 175, "Negro", "Negro", "Caucásica", false, "Estadounidense", 0, "Productor", "./img/joel.png");
let arrayProfesionales = [actor1, actor2, actor3, actor4, actor5, director1, director2, guionista1, guionista2, productor];
// Instanciar Movie
let pelicula1 = new Movie("Matrix", 1999, "Estadounidense");
// Añadir resto datos
pelicula1.actors = [actor2, actor4, actor5];
pelicula1.director = director1;
pelicula1.writer = guionista1;
pelicula1.language = "Inglés";
pelicula1.platform = "Cine";
pelicula1.isMCU = false;
pelicula1.mainCharacterName = "Neo";
pelicula1.producer = productor;
pelicula1.distributor = "Warner Bros";
pelicula1.genre = "Ciencia ficción";
pelicula1.urlFoto = "./img/matrix.png"
// Instanciar Movie
let pelicula2 = new Movie("Titanic", 1995, "Canadiense");
// Añadir resto datos
pelicula2.actors = [actor1, actor3, actor2];
pelicula2.director = director2;
pelicula2.writer = guionista2;
pelicula2.language = "Español";
pelicula2.platform = "Streamer";
pelicula2.isMCU = false;
pelicula2.mainCharacterName = "Jack Dawson";
pelicula2.producer = productor;
pelicula2.distributor = "20th Century Studios";
pelicula2.genre = "Romántica";
pelicula2.urlFoto = "./img/titanic.png"
// Instanciar Movie
let pelicula3 = new Movie("Spider-Man", 2005, "Inglesa");
// Añadir resto datos
pelicula3.actors = [actor1, actor3, actor5];
pelicula3.director = director1;
pelicula3.writer = guionista2;
pelicula3.language = "Alemán";
pelicula3.platform = "TV";
pelicula3.isMCU = true;
pelicula3.mainCharacterName = "Piter Parker";
pelicula3.producer = productor;
pelicula3.distributor = "Marbel Studios";
pelicula3.genre = "Superhéroes";
pelicula3.urlFoto = "./img/spiderman.png"
// Instanciar Imdb con tres películas como punto de partida
let imdb = new Imdb([pelicula1, pelicula2, pelicula3]);
//***************************************************************************
// Fin de inicialización base datos
//***************************************************************************

//***************************************************************************
// Carga del DOM
//***************************************************************************
jQuery(() => {
    
    // Generar contenido HTML de las películas
    generarPeliculasHTML();
    
    // Generar contenido HTML de los profesionales
    generarProfesionalesHTML();

    // Mostrar contenedor de películas
    $('#peliculas').show();
    
    // Controlar enlaces y mostrar el container correspondiente
    $('#enlace-peliculas').on('click', () => {
        if (!$('#enlace-peliculas').hasClass('active')) {
            activaEnlace('peliculas');
        };
    });
    $('#enlace-actores').on('click', () => {
        if (!$('#enlace-actores').hasClass('active')) {
            activaEnlace('actor');
        };
    });
    $('#enlace-directores').on('click', () => {
        if (!$('#enlace-directores').hasClass('active')) {
            activaEnlace('director');
        };
    });
    $('#enlace-guionistas').on('click', () => {
        if (!$('#enlace-guionistas').hasClass('active')) {
            activaEnlace('guionista');
        };
    });
    $('#enlace-productores').on('click', () => {
        if (!$('#enlace-productores').hasClass('active')) {
            activaEnlace('productor');
        };
    });
    $('#enlace-formulario').on('click', () => {
        if (!$('#enlace-formulario').hasClass('active')) {
            activaEnlace('formulario');
        };
    });
    $('#guardar').on('click', () => {
        guardar();
    })
})
//***************************************************************************
// Fin carga DOM
//***************************************************************************

//***************************************************************************
// Generar películas en HTML
//***************************************************************************
function generarPeliculasHTML(){
    imdb.peliculas.forEach((pelicula, indice) => {
        generarPeliculaHTML(indice);
    });
}
function generarPeliculaHTML(indice) {
    let peliculaElementoHTML = $('#peliculas');
    let { title, releaseYear, actors, director, distributor, genre, urlFoto } = imdb.peliculas[indice];
    let peliculaHTML = '<div class="card col-xl-5 mb-3 p-2"><div class="row no-gutters"><div class="col-3">';        
    peliculaHTML += '<img src="' + urlFoto + '" style="width: 9rem;"></div><div class="col-9">';
    peliculaHTML += '<div class="card-body"><h5 class="card-title">' + title + '</h5>';
    peliculaHTML += '<span class="card-text"><small><b>Reparto: </b>'
    actors.forEach((actor, indice) => {
        peliculaHTML += (indice < actors.length - 1) ? actor.name + ', ' : actor.name + '...';
    });
    peliculaHTML += '</small></span><br><span class="card-text"><small><b>Director: </b>' + director.name + '</small></span><br>';
    peliculaHTML += '<span class="card-text"><small><b>Distribuidora: </b>' + distributor + '</small></span><br>';
    peliculaHTML += '<span class="card-text"><small><b>Año: </b>' + releaseYear.toString() + '</small></span><br>';
    peliculaHTML += '<span class="card-text"><small><b>Género: </b>' + genre + '</small></span></div></div></div></div>';

    peliculaElementoHTML.append(peliculaHTML);
}
//***************************************************************************
// Fin generar películas en HTML
//***************************************************************************

//***************************************************************************
// Generar profesionales en HTML
//***************************************************************************
function generarProfesionalesHTML(){
    arrayProfesionales.forEach((profesional) => {
        let { name, nationality, age, weight, height, profession, urlFoto } = profesional;
        let profesionalElementoHTML = $('#' + profession.toLowerCase());
        let profesionalHTML = '<div class="card col-12 col-md-6 col-lg-4" style="width: 18rem;">';
        profesionalHTML += '<img src="' + urlFoto + '" class="card-img-top mt-3">';
        profesionalHTML += '<div class="card-body"><h5 class="card-title">' + name + '</h5>';
        profesionalHTML += '<span class="card-text"><small><b>Nacionalidad: </b>' + nationality + '</small></span><br>';
        profesionalHTML += '<span class="card-text"><small><b>Edad: </b>' + age.toString() + '</small></span><br>';
        profesionalHTML += '<span class="card-text"><small><b>Peso: </b>' + weight.toString() + '</small></span><br>';
        profesionalHTML += '<span class="card-text"><small><b>Altura: </b>' + height.toString() + '</small></span><br></div></div>';
        profesionalElementoHTML.append(profesionalHTML);
    });
}
//***************************************************************************
// Fin generar prfesionales en HTML
//***************************************************************************

//***************************************************************************
// Activar el contenedor correspondiente y cambiar active
//***************************************************************************
function activaEnlace(enlace) {
    $('#enlace-' + ultimoActivo).removeClass('active');
    $('#' + ultimoActivo).hide();
    $('#enlace-' + enlace).addClass('active');
    $('#' + enlace).show();
    ultimoActivo = enlace;
}
//***************************************************************************
// Fin de activar los contenedores correspondientes y cambiar active
//***************************************************************************

//***************************************************************************
// Guardar nueva película
//***************************************************************************
function guardar(){
    let alerta = "";

    let title = $('#title').val();
    let actores = $('#actors').val();
    let director = $('#director2').val();
    let distributor = $('#distributor').val();
    let releaseYear = $('#releaseYear').val();
    let genre = $('#genre').val();
    let nationality = $('#nationality').val();
    let writer = $('#writer').val();
    let language = $('#language').val();
    let platform = $('#platform').val();
    let mainCharacterName = $('#mainCharacterName').val();
    let producer = $('#producer').val();
    let isMCU = $('#isMCU').prop('checked');
    let urlFoto = $('#urlFoto').val();

    alerta += (title.length == 0) ? "Título obligatorio.\n" : "";
    alerta += (actores.length == 0) ? "Actores obligatorio.\n" : "";
    alerta += (director.length == 0) ? "Director obligatorio.\n" : "";
    alerta += (distributor.length == 0) ? "Distribuidora obligatorio.\n" : "";
    alerta += (releaseYear.length == 0) ? "Año lanzamiento obligatorio.\n" : "";
    alerta += (genre.length == 0) ? "Género obligatorio.\n" : "";
    alerta += (nationality.length == 0) ? "Nacionalidad obligatoria.\n" : "";
    alerta += (urlFoto.length == 0) ? "url de Foto obligatoria." : "";

    if (alerta.length == 0) {
        
        let arrayActores = actores.split('\n');
        let actors = [];
        arrayActores.forEach((actor) => {
            let jsonActor = { name: actor };
            actors.push(jsonActor);
        });

        // Instanciar Movie
        let pelicula = new Movie(title, parseInt(releaseYear), nationality);
        // Añadir resto datos
        pelicula.actors = actors;
        pelicula.director = { name: director };
        pelicula.writer = writer;
        pelicula.language = language;
        pelicula.platform = platform;
        pelicula.isMCU = isMCU;
        pelicula.mainCharacterName = mainCharacterName;
        pelicula.producer = producer;
        pelicula.distributor = distributor;
        pelicula.genre = genre;
        pelicula.urlFoto = urlFoto;

        imdb.peliculas.push(pelicula);

        generarPeliculaHTML(imdb.peliculas.length - 1);

        alerta = "Guardado correctamente."
        $("#reset").trigger("click");
    };
    
    alert(alerta);
}
//***************************************************************************
// Fin de guardar nueva película
//***************************************************************************
