const express = require("express")
const app = express()
const PORT = 3000;

const hbs = require('express-handlebars');
app.use(express.static('static'))
const path = require("path")

const context = require("./data/data.json")

let cos_a = []
let cos_b = []

for (let i = 0; i < context.t.length; i++) {
    //console.log(i, context.t[i].a)
    if (context.t[i].a) {
        cos_a.push({ "a": context.t[i].a })
    }
    if (context.t[i].b) {
        cos_b.push({ "b": context.t[i].b })
    }
}


let obj_wspolny = { cos_a, cos_b }
console.log(obj_wspolny)

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/static/1.html")
})

app.get("/cos", function (req, res) {
    res.render('view2.hbs', obj_wspolny);
})

app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));   // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs');

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})