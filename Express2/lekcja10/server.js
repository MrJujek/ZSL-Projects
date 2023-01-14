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

let context = {
    directories: [],
    files: []
}
// let id = 1
let allFiles

app.get("/", async function (req, res) {
    fs.readdir(path.join(__dirname, "files"), (err, files) => {
        if (err) throw err
        allFiles = files
        console.log(allFiles);

        context = {
            directories: [],
            files: []
        }
        files.forEach((file) => {
            fs.lstat(path.join(__dirname, "files", file), (err, stats) => {
                let fileToPush = { name: file }
                if (stats.isDirectory()) {
                    fileToPush.obraz = "folder.png"
                    context.directories.push(fileToPush)
                } else {
                    fileToPush.obraz = getIcon(file)
                    context.files.push(fileToPush)
                }
            })
        })

        res.render('filemanager.hbs', context);
    })
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

app.get('/newFile', function (req, res) {
    let name = req.query.name
    let splitted = name.split(".")
    let fileName = name
    if (!(splitted.length >= 2)) {
        fileName += ".txt"
    }
    for (let i = 0; i < allFiles.length; i++) {
        if (allFiles[i] == fileName) {
            let time = new Date().getTime();
            let splitted = fileName.split(".")
            fileName = splitted[0] + time + "." + splitted[1]
            break;
        }
    }

    const filepath = path.join(__dirname, "files", fileName)
    fs.writeFile(filepath, "", (err) => {
        if (err) throw err

        res.redirect("/")
    })
})

app.get('/newFolder', function (req, res) {
    let name = req.query.name
    if (!name) {
        let time = new Date().getTime();
        name = "NewFolder" + time
    }

    let filepath = path.join(__dirname, "files", name)
    if (!fs.existsSync(filepath)) {
        console.log("nie istnieje");
        fs.mkdir(filepath, (err) => {
            if (err) throw err

            res.redirect("/")
        })
    } else {
        let time = new Date().getTime();
        name += time
        filepath = path.join(__dirname, "files", name)
        fs.mkdir(filepath, (err) => {
            if (err) throw err

            res.redirect("/")
        })
    }
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

function getIcon(file) {
    let obraz
    let splitted = file.split(".")

    switch (splitted[1]) {
        case 'jpg':
            obraz = "jpg.png";
            break;

        case 'png':
            obraz = "png.png";
            break;

        case 'bmp':
            obraz = "bmp.png";
            break;

        case 'txt':
            obraz = "txt.png";
            break;

        case 'pdf':
            obraz = "pdf.png";
            break;

        case 'docx':
            obraz = "docx.png";
            break;

        case 'xlsx':
            obraz = "xlsx.png";
            break;

        case 'js':
            obraz = "js.png"
            break;

        case 'json':
            obraz = "json.png";
            break;

        default:
            obraz = "unknown.png";
            break;
    }
    return obraz
}