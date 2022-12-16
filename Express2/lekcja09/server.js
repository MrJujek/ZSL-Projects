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


let context = { files: [] }
let id = 1


app.get("/", function (req, res) {
    res.render('upload.hbs');
})


app.post('/filemanager', function (req, res) {
    let form = formidable({});

    form.uploadDir = __dirname + '/static/upload/'
    form.keepExtensions = true
    form.multiples = true
    form.parse(req, function (err, fields, files) {
        console.log(files);
        //console.log(files);
        if (files.filestoupload.length) {
            for (let i = 0; i < files.filestoupload.length; i++) {
                let size = files.filestoupload[i].size
                let path = files.filestoupload[i].path
                let type = files.filestoupload[i].type
                let name = files.filestoupload[i].name
                let savedate = new Date()

                let obraz = getIcon(type)

                let obj = { id: id, obraz: obraz, name: name, type: type, size: size, path: path, savedate: savedate }
                context.files.push(obj)

                id++
            }
        }
        else {
            let size = files.filestoupload.size
            let path = files.filestoupload.path
            let type = files.filestoupload.type
            let name = files.filestoupload.name
            let savedate = files.filestoupload.lastModifiedDate

            let obraz = getIcon(type)

            let obj = { id: id, obraz: obraz, name: name, type: type, size: size, path: path, savedate: savedate }
            context.files.push(obj)

            id++
        }

        //console.log(context);


    });
    res.render("filemanager.hbs", context)
});

app.get('/show/', function (req, res) {
    let id = req.query.id

    for (let i = 0; i < context.files.length; i++) {
        if (id == context.files[i].id) {
            res.sendFile(context.files[i].path)
        }
    }
});

app.get('/download/', function (req, res) {
    let id = req.query.id

    for (let i = 0; i < context.files.length; i++) {
        if (id == context.files[i].id) {
            res.download(context.files[i].path)
        }
    }
});

app.get('/info/', function (req, res) {
    let id = req.query.id

    for (let i = 0; i < context.files.length; i++) {
        if (id == context.files[i].id) {
            let size = context.files[i].size
            let path = context.files[i].path
            let type = context.files[i].type
            let name = context.files[i].name
            let savedate = context.files[i].savedate

            let obj = { id: id, name: name, type: type, size: size, path: path, savedate: savedate }
            res.render("info.hbs", obj)
        }
    }
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