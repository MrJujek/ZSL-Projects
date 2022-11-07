const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path")
const hbs = require('express-handlebars');
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('static'))


const context = require("./data/dane.json")

//console.log(context);

let wszystkie_kategorie_pomoc = []
let wszystkie_kategorie = [{ dane: "wybierz" }]
for (let i = 0; i < context.root.length; i++) {
    if (!(wszystkie_kategorie_pomoc.includes(context.root[i].category))) {
        wszystkie_kategorie_pomoc.push(context.root[i].category)
        wszystkie_kategorie.push({ dane: context.root[i].category })
    }
}

let pierwsze_pomoc = []
let pierwsze = []
for (let i = 0; i < context.root.length; i++) {
    let litera = context.root[i].title.substring(0, 1);
    if (!(pierwsze_pomoc.includes(litera))) {
        pierwsze_pomoc.push(litera)
        pierwsze.push({ dane: litera })
    }
}

let produkty = []
for (let i = 0; i < context.root.length; i++) {
    produkty.push({ nazwa: context.root[i].title, kategoria: context.root[i].category, cena: context.root[i].price.toFixed(2) + " $" })
}



let wyslij = { wszystkie_kategorie: wszystkie_kategorie, pierwsze: pierwsze, produkty: produkty }

console.log(wyslij);
app.get("/", function (req, res) {
    res.render('view1.hbs', wyslij);
})

app.get("/filtruj", function (req, res) {
    let wybrano = req.query.wybierz
    let zaznaczono = req.query.zaznacz
    console.log(zaznaczono);

    if (wybrano == "wybierz") {

    }

    let do_pokazania = []
    if (zaznaczono == undefined) {
        for (let i = 0; i < wyslij.produkty.length; i++) {
            if (wyslij.produkty[i].kategoria == wybrano) {
                do_pokazania.push(wyslij.produkty[i])


            }
        }
    } else {
        for (let i = 0; i < wyslij.produkty.length; i++) {
            if (wyslij.produkty[i].kategoria == wybrano) {
                if (wyslij.produkty[i].nazwa.substring(0, 1) == zaznaczono) {
                    do_pokazania.push(wyslij.produkty[i])
                }

            }
        }
    }


    let pokaz = { pokaz: do_pokazania }
    console.log(pokaz);
    res.render('view2.hbs', pokaz);
})


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs({
    extname: '.hbs',
    partialsDir: "views/partials",
}));

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})