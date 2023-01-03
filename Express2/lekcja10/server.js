const fs = require("fs")
const path = require("path")
const filepath = path.join(__dirname, "files", "file01.txt")

console.log(1);
fs.readFile(filepath, (err, data) => {
    if (err) throw err
    console.log(data.toString());
})

console.log(2);
fs.readFile(filepath, "utf-8", (err, data) => {
    if (err) throw err
    console.log(data.toString());
})



const filepath2 = path.join(__dirname, "files", "file02.txt")
console.log(3);
fs.writeFile(filepath2, "tekst do wpisania2", (err) => {
    if (err) throw err
    console.log("plik nadpisany");
})
console.log(4);
fs.appendFile(filepath2, "\n\ntekst do dopisania", (err) => {
    if (err) throw err
    console.log("plik utworzony");
})
console.log(5);
fs.unlink(filepath, (err) => {
    if (err) throw err
    console.log("czas 1: " + new Date().getMilliseconds());
})
console.log(6);
if (fs.existsSync(filepath)) {
    console.log("plik istnieje");
} else {
    console.log("plik nie istnieje");
}
console.log(7);
const filepath3 = path.join(__dirname, "files", "file03.txt")
const filepath4 = path.join(__dirname, "files", "file04.txt")

fs.writeFile(filepath3, "tekst do zapisania", (err) => {
    if (err) throw err
    console.log("plik utworzony - czas 1: " + new Date().getMilliseconds());

    fs.appendFile(filepath3, "\n\ntekst do dopisania", (err) => {
        if (err) throw err
        console.log("plik zmodyfikowany - czas 2: " + new Date().getMilliseconds());

    })
})