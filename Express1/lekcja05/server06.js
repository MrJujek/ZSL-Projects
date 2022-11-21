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
    subject: "ćwiczenie 5 - dane z tablicy, select",
    fields: [
        { name: "title" },
        { name: "author" },
        { name: "lang" }
    ],
    books: [
        { title: "Lalka", author: "B Prus", lang: "PL" },
        { title: "Hamlet", author: "W Szekspir", lang: "ENG" },
        { title: "Pan Wołodyjowski", author: "H Sienkiewicz", lang: "PL" },
        { title: "Zamek", author: "F Kafka", lang: "CZ" }
    ]
}

app.get("/", function (req, res) {
    res.render('index06.hbs', context);
})

app.get("/odp", function (req, res) {
    let dane = req.query.radio

    let tab = null
    switch (dane) {
        case "title":
            tab = {
                subject: context.subject,
                lama: [
                    { data: context.books[0].title },
                    { data: context.books[1].title },
                    { data: context.books[2].title },
                    { data: context.books[3].title }]
            }
            break;

        case "author":
            tab = {
                subject: context.subject,
                lama: [
                    { data: context.books[0].author },
                    { data: context.books[1].author },
                    { data: context.books[2].author },
                    { data: context.books[3].author }]
            }
            break;
        case "lang":
            tab = {
                subject: context.subject,
                lama: [
                    { data: context.books[0].lang },
                    { data: context.books[1].lang },
                    { data: context.books[2].lang },
                    { data: context.books[3].lang }]
            }
            break;
        default:
            tab = { lama: [{ data: "nie wybrano zadnego" }] }
            break;
    }

    res.render('index041.hbs', tab);
})



app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));   // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs');

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})