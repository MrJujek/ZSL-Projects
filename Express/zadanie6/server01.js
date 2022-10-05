const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path")
const formidable = require('formidable');

app.use(express.static('static'))

app.use(express.urlencoded({
    extended: true
}));

app.post('/handleUpload', function (req, res) {
    res.setHeader("content-type", "application/json")

    let form = formidable({});

    form.uploadDir = __dirname + '/static/upload/'       // folder do zapisu zdjęcia
    form.keepExtensions = true
    form.multiples = true
    form.parse(req, function (err, fields, files) {

        console.log("----- przesłane pola z formularza ------");

        console.log(fields);

        console.log("----- przesłane formularzem pliki ------");

        console.log(files);

        let zwrot = []
        zwrot.push(fields)

        let obj = { "imagetoupload": files["imagetoupload"] }
        zwrot.push(obj)

        res.send(JSON.stringify(zwrot, null, 4))
    });
});

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})

//1.html