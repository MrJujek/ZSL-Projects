const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path")
const formidable = require('formidable');
var hbs = require('express-handlebars');

app.use(express.static('static'))
app.use(express.static('static/icons'))

app.use(express.urlencoded({
    extended: true
}));


let datas = { images: [] }


app.get("/", function (req, res) {
    res.render('upload.hbs');
})


app.post('/filemanager', function (req, res) {
    let form = formidable({});

    form.uploadDir = __dirname + '/static/upload/'       // folder do zapisu zdjęcia
    form.keepExtensions = true
    form.multiples = true
    form.parse(req, function (err, fields, files) {
        for (let i = 0; i < files.imagetoupload.length; i++) {
            let size = files.imagetoupload[i].size
            let path = files.imagetoupload[i].path
            let id = 1
            let type = files.imagetoupload[i].type
            let name = files.imagetoupload[i].name

            let obraz
            switch (type) {
                case 'image/jpeg':
                    obraz = "jpeg.png"
                    break;

                default:
                    obraz = 1
                    break;
            }

            let obj = { id: id, obraz: obraz, name: name, type: type, size: size, path: path }

            datas.images.push(obj)
        }

        console.log(datas);

        res.render("filemanager.hbs", datas)//JSON.stringify(datas, null, 4))
    });
});


app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));   // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs');


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})