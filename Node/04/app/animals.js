let animalsArray = ["aaa"]

class Animals {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    eat() {
        console.log(`${this.name} is eating`);
    }
}

module.exports = { Animals, animalsArray }