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

const Datastore = require('nedb');

const coll1 = new Datastore({
    filename: '02.db',
    autoload: true
});

app.get("/", function (req, res) {
    let obj = {
        box1: req.query.box1 ? "TAK" : "NIE",
        box2: req.query.box2 ? "TAK" : "NIE",
        box3: req.query.box3 ? "TAK" : "NIE",
        box4: req.query.box4 ? "TAK" : "NIE"
    }

    coll1.insert(obj, function (err, newDoc) {
        let zwrot

        coll1.find({}, function (err, docs) {
            zwrot = []
            for (let i = 0; i < Object.keys(docs).length; i++) {
                zwrot.push({ "dane": docs[i] })
            }

            res.render('02.hbs', { zwrot: zwrot });
        });

    });

    res.render('01.hbs')
})

app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.set('view engine', 'hbs');

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})