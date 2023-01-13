const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path")
const formidable = require('formidable');
const os = require("os")
const fs = require("fs")
const fsPromises = require('fs/promises')
var hbs = require('express-handlebars');

app.use(express.static('static'))
app.use(express.static('static/icons'))

app.use(express.urlencoded({
    extended: true
}));


let context = { files: [] }
let id = 1
let allFiles

async function getDirectory() {
    const dir = {
        folders: [],
        files: [],
        others: [],
    }

    const directory = fs.readdirSync(path.join(__dirname, 'files'))
    //console.log(directory)

    await Promise.all(directory.map(async (e) => {
        const stats = await fsPromises.lstat(path.join(__dirname, 'files', e))
        const d = { name: e }

        if (stats.isDirectory()) {
            d.img = 'folder.png'
            dir.folders.push(d)
        } else if (stats.isFile()) {
            d.img = getIcon(d.name)
            dir.files.push(d)
        } else {
            d.img = '/gfx/other.png'
            dir.others.push(d)
        }
    })

    )
    return dir
}

app.get("/", async function (req, res) {
    fs.readdir(path.join(__dirname, "files"), (err, files) => {
        if (err) throw err
        allFiles = files
        console.log("CZYTANIE FOLDERU");
        console.log(files);
    })

    const dir = await getDirectory()
    console.log(dir);
    res.render('filemanager.hbs', dir);
})

app.post("/upload", function (req, res) {
    let form = formidable({});

    // const userHome = os.homedir()
    // form.uploadDir = path.join(userHome, "Desktop")
    form.uploadDir = path.join(__dirname, 'files')
    form.keepExtensions = true
    form.multiples = true

    form.on('fileBegin', function (name, file) {
        let fileName = file.name
        for (let i = 0; i < allFiles.length; i++) {
            if (allFiles[i] == file.name) {
                let time = new Date().getTime();
                let splitted = fileName.split(".")
                fileName = splitted[0] + time + "." + splitted[1]
                break;
            }
        }
        file.path = form.uploadDir + '/' + fileName
    })

    form.parse(req, function (err, fields, files) {
        if (err) throw err
        res.redirect("/")
    });
})

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
    let bool = true
    for (let i = 0; i < context.files.length; i++) {
        if (id == context.files[i].id) {
            let size = context.files[i].size
            let path = context.files[i].path
            let type = context.files[i].type
            let name = context.files[i].name
            let savedate = context.files[i].savedate

            let obj = { id: id, name: name, type: type, size: size, path: path, savedate: savedate }
            res.render("info.hbs", obj)
            bool = false
        }
    }
    if (bool) {
        res.render("info.hbs")
    }
});

app.get('/delete/', function (req, res) {
    let id = req.query.id

    // if (id) {
    for (let i = 0; i < context.files.length; i++) {
        if (id == context.files[i].id) {
            context.files.splice(i, 1)
        }
    }
    // } else {
    //     context = { files: [] }
    // }

    res.render("filemanager.hbs", context)
});

app.get('/reset/', function (req, res) {
    context = { files: [] }

    res.render("filemanager.hbs", context)
})

app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));
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

        case 'text/javascript':
            obraz = "js.png"
            break;

        case 'application/json':
            obraz = "json.png";
            break;

        default:
            obraz = "unknown.png";
            break;
    }
    return obraz
}