// Impoirtación de clases
const imdb_1 = require("./clases/imdb");
const movie_1 = require("./clases/movie");
const professional_1 = require("./clases/professional");

//***************************************************************************
// Generamos una base de datos en memoria con 3 películas
//***************************************************************************
// Instanciar Professional
let actor1 = new professional_1.Professional("Charlize Theron", 46, "Femenino", 58, 177, "Rubio", "Azul", "Caucásica", false, "Sudafricana", 1, "Actriz");
let actor2 = new professional_1.Professional("Keanu Reeves", 57, "Masculino", 82, 186, "Negro", "Negro", "Caucásica", false, "Libanesa", 0, "Actor");
let actor3 = new professional_1.Professional("Uma Thurman", 51, "Femenino", 71, 180, "Rubio", "Azul", "Caucásica", false, "Estadounidense", 0, "Actriz");
let actor4 = new professional_1.Professional("Laurence John Fishburne", 60, "Masculino", 87, 184, "Calvo", "Negro", "Negra", false, "Estadounidense", 0, "Actor");
let actor5 = new professional_1.Professional("Carrie-Anne Moss", 54, "Femenino", 57, 173, "Negro", "Negro", "Caucásica", false, "Canadiense", 0, "Actriz");
let director1 = new professional_1.Professional("Lana Wachowski", 56, "Femenino", 70, 179, "Rojo", "Negro", "Caucásica", false, "Estadounidense", 0, "Director");
let director2 = new professional_1.Professional("James Cameron", 67, "Masculino", 81, 187, "Blanco", "Gris", "Caucásica", false, "Canadiense", 3, "Director");
let guionista1 = new professional_1.Professional("Lilly Wachowski:", 54, "Femenino", 92, 173, "Rubio", "Castaño", "Caucásica", false, "Estadounidense", 0, "Guionista");
let guionista2 = new professional_1.Professional("Quentin Tarantino", 58, "Masculino", 92, 185, "Marrón oscuro", "Café", "Caucásica", false, "Estadounidense", 2, "Guionista");
let productor = new professional_1.Professional("Joel Silver", 69, "Masculino", 84, 175, "Negro", "Negro", "Caucásica", false, "Estadounidense", 0, "Productor");
// Instanciar Movie
let pelicula1 = new movie_1.Movie("Matrix", 1999, "Estadounidense");
// Añadir resto datos (directamente ya que son públicos)
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
// Instanciar Movie
let pelicula2 = new movie_1.Movie("Titanic", 1995, "Canadiense");
// Añadir resto datos (directamente ya que son públicos)
pelicula2.actors = [actor1, actor2, actor3];
pelicula2.director = director2;
pelicula2.writer = guionista2;
pelicula2.language = "Español";
pelicula2.platform = "Streamer";
pelicula2.isMCU = false;
pelicula2.mainCharacterName = "Jack Dawson";
pelicula2.producer = productor;
pelicula2.distributor = "20th Century Studios";
pelicula2.genre = "Histórica";
// Instanciar Movie
let pelicula3 = new movie_1.Movie("Spider-Man", 2005, "Inglesa");
// Añadir resto datos (directamente ya que son públicos)
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
// Instanciar Imdb con tres películas como punto de partida
let imdb = new imdb_1.Imdb([pelicula1, pelicula2, pelicula3]);
//***************************************************************************


//***************************************************************************
// Generamos una base de datos en memoria con 3 películas
//***************************************************************************




// Mostrar peliculas de la instancia nuevoImdb
imdb.peliculas.forEach((pelicula) => {
    pelicula.printMovie();
});