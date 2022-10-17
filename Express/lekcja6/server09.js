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

const context = require("./data/data09.json")
console.log(context)

app.get("/", function (req, res) {
    res.render('index09.hbs', context);
})

app.engine('hbs', hbs({
    defaultLayout: 'main.hbs',
    helpers: {
        shortTitle: function (title) {
            return title.substring(0, 10) + "...";
        },
        duze: function (title) {
            //console.log(title)
            const tab = title.split(" ");
            //console.log(tab)
            let zwrot = ""
            for (let i = 0; i < tab.length; i++) {
                let pomoc = tab[i].split("")[0].toUpperCase()
                tab[i] = pomoc + tab[i].substring(1, tab[i].length)
                zwrot += tab[i] + " "
            }
            //console.log(tab)
            return zwrot
        },
        myslniki: function (title) {
            console.log(title)
            const tab = title.split(" ");
            console.log(tab)

            let zwrot = ""
            for (let i = 0; i < tab.length; i++) {
                for (let j = 0; j < tab[i].length; j++) {
                    zwrot += tab[i].substring(j, j + 1)
                    if (!(j + 1 >= tab[i].length)) zwrot += "-"
                }

                zwrot += " "
            }

            console.log(tab)
            return zwrot
        },

    }
}));

app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.set('view engine', 'hbs');

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})