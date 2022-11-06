const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path")

const bodyParser = require('body-parser');
app.use(express.urlencoded({
    extended: true
}));

const hbs = require('express-handlebars');

const context = {

    qwe: [
        { a: 1, b: 1 },
        { a: 2, b: 2 }
    ],
    asd: [
        { a: 3, b: 3 },
        { a: 4, b: 4 }
    ]

}

app.use(express.static('static'))

app.get("/", (req, res) => {
    res.render('view1.hbs', context);
    //res.sendFile(__dirname + "/static/strona.html")
})

app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));   // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs');

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})