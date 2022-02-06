// Clase Professional
class Professional {
    // Constructor
    constructor(name, age, genre, weight, height, hairColor, eyeColor, race, isRetired, nationality, oscarsNumber, profession) {
        this.name = name;
        this.age = age;
        this.genre = genre;
        this.weight = weight;
        this.height = height;
        this.hairColor = hairColor;
        this.eyeColor = eyeColor;
        this.race = race;
        this.isRetired = isRetired;
        this.nationality = nationality;
        this.oscarsNumber = oscarsNumber;
        this.profession = profession;
    }
    // Métodos públicos
    printProfessional() {
        console.log("Atributos de", this.name);
        for (let atributo in this) {
            console.log(atributo + ":", this[atributo]);
        }
        ;
    }
}
exports.Professional = Professional;
