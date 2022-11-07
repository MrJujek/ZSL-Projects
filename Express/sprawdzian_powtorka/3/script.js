const express = require("express")
const app = express()
const PORT = 3000;

const hbs = require('express-handlebars');
app.use(express.static('static'))
const path = require("path")

app.use(express.urlencoded({
    extended: true
}));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/static/1.html")
})

app.post("/oddaj", function (req, res) {
    let dane = req.body.text
    console.log(dane);
    res.render("view1.hbs", { dane: dane })
})

app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs({
    defaultLayout: 'main.hbs',
    helpers: {
        pokaz_mi: (tekst) => {
            let zwrot = tekst.split("")
            return zwrot.join("-")
        }
    }
}));
app.set('view engine', 'hbs');

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})