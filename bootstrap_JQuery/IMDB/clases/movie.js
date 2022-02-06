// Clase Movie
class Movie {
    // Constructor
    constructor(title, releaseYear, nationality) {
        this.title = title;
        this.releaseYear = releaseYear;
        this.actors = [];
        this.nationality = nationality;
        this.language = "";
        this.platform = "";
        this.isMCU = false;
        this.mainCharacterName = "";
        this.distributor = "";
        this.genre = "";
    }
    // Métodos públicos
    printMovie() {
        console.log("Atributos de la película", this.title);
        for (let atributo in this) {
            console.log(atributo + ":", this[atributo]);
        }
        ;
    }
}
exports.Movie = Movie;
