const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path")
const fs = require("fs")
const hbs = require('express-handlebars');

app.use(express.static('static'))
app.use(express.static('static/cwiczenia'))

app.use(express.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {
    fs.readdir(__dirname + '/static/cwiczenia/', (err, files) => {
        if (err) {
            console.log(err)
        } else {
            let obj = { "files": [] }
            for (let i = 0; i < files.length; i++) {
                obj.files[i] = { "plik": files[i] }
            }
            console.log(obj)

            res.render('index.hbs', obj)
        }
    })
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})