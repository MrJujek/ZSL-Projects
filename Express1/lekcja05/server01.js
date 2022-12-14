const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path")
const formidable = require('formidable');
var hbs = require('express-handlebars');


app.use(express.static('static'))

app.use(express.urlencoded({
    extended: true
}));

const context = {

    t: [
        { a: 1, b: 1 },
        { a: 2, b: 2 }
    ]

}

app.get("/login", function (req, res) {
    res.render('login.hbs');
})

app.get("/index", function (req, res) {
    res.render('index.hbs');
})

app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));   // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs');

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})