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
    subject: "ćwiczenie 3 - dane z tablicy obiektów",
    books: [
        { title: "Lalka", author: "B Prus", lang: "PL" },
        { title: "Hamlet", author: "W Szekspir", lang: "ENG" },
        { title: "Pan Wołodyjowski", author: "H Sienkiewicz", lang: "PL" },
        { title: "Dwór mgieł i furii", author: "S.J. Maas", lang: "CZ" }
    ]
}

app.get("/", function (req, res) {
    res.render('index03.hbs', context);
})



app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));   // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs');

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})