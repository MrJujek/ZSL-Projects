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
let id = 1


app.get("/", function (req, res) {
    res.render('upload.hbs');
})


app.post('/filemanager', function (req, res) {
    let form = formidable({});

    form.uploadDir = __dirname + '/static/upload/'       // folder do zapisu zdjęcia
    form.keepExtensions = true
    form.multiples = true
    form.parse(req, function (err, fields, files) {
        if (files.filetoupload.length) {
            for (let i = 0; i < files.filetoupload.length; i++) {
                let size = files.filetoupload[i].size
                let path = files.filetoupload[i].path
                let type = files.filetoupload[i].type
                let name = files.filetoupload[i].name

                let obraz = getIcon(type)

                let obj = { id: id, obraz: obraz, name: name, type: type, size: size, path: path }

                datas.images.push(obj)
                id++
            }
        }
        else {
            let size = files.filetoupload.size
            let path = files.filetoupload.path
            let type = files.filetoupload.type
            let name = files.filetoupload.name

            let obraz = getIcon(type)

            let obj = { id: id, obraz: obraz, name: name, type: type, size: size, path: path }

            datas.images.push(obj)
            id++
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

function getIcon(type) {
    let obraz
    switch (type) {
        case 'image/jpeg':
            obraz = "jpg.png";
            break;

        case 'image/png':
            obraz = "png.png";
            break;

        case 'image/bmp':
            obraz = "bmp.png";
            break;

        case 'text/plain':
            obraz = "txt.png";
            break;

        case 'application/pdf':
            obraz = "pdf.png";
            break;

        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            obraz = "docx.png";
            break;

        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            obraz = "xlsx.png";
            break;

        default:
            obraz = "unknown.png";
            break;
    }
    return obraz
}