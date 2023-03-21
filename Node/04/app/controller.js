// załącz klasę Animal i tablicę zwierząt
const { Animal, animalsArray } = require("./animals.js");

module.exports = {
    add: (data) => {
        console.log(data.split(","));
        //let animal = new Animal();
        // utwórz obiekt klasy Animal
        // dodaj do animalsArray
    },

    delete: (id) => {
        // usuwanie po id z animalsArray
    },

    update: (id) => {
        // update po id elementu animalsArray
    },

    getall: () => {
        return animalsArray
    },

    getExtensionType: (extension) => {
        switch (extension) {
            case "css":
                return "text/css";
            case "js":
                return "text/javascript";
            case "html":
                return "text/html";
            default:
                return "text/plain";
        }
    }

}