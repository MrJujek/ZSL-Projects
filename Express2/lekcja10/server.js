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
                let fileToPush = { name: file, obraz: "unknown.png" }
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
                if (splitted.length >= 2) {
                    fileName = splitted[0] + time + "." + splitted[1]
                } else {
                    fileName = splitted[0]
                }
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
    if (!name) {
        let time = new Date().getTime();
        name = "NewFile" + time
    }

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

app.get('/deleteFile', function (req, res) {
    let name = req.query.name
    let filepath = path.join(__dirname, "files", name)

    fs.unlink(filepath, (err) => {
        if (err) throw err

        res.redirect("/")
    })
});

app.get('/deleteFolder', function (req, res) {
    let name = req.query.name
    let filepath = path.join(__dirname, "files", name)
    if (fs.existsSync(filepath)) {
        fs.rmdir(filepath, (err) => {
            if (err) throw err

            res.redirect("/")
        })
    }
});

app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));
app.set('view engine', 'hbs');

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})

let fileIcons = [
    '3ds.png', 'aac.png', 'ai.png',
    'avi.png', 'bmp.png', 'cad.png',
    'cdr.png', 'close.png', 'css.png',
    'dat.png', 'direct-download.png', 'dll.png',
    'dmg.png', 'doc.png', 'eps.png',
    'fla.png', 'flv.png', 'folder.png',
    'gif.png', 'html.png', 'indd.png',
    'iso.png', 'jpg.png', 'js.png',
    'midi.png', 'mov.png', 'mp3.png',
    'mpg.png', 'pdf.png', 'php.png',
    'png.png', 'ppt.png', 'ps.png',
    'psd.png', 'raw.png', 'sql.png',
    'svg.png', 'tif.png', 'txt.png',
    'unknown.png', 'wmv.png', 'xls.png',
    'xml.png', 'zip.png'
]
function getIcon(file) {
    let splitted = file.split(".")
    let obraz = "unknown.png"

    for (let i = 0; i < fileIcons.length; i++) {
        if (splitted[splitted.length - 1] == fileIcons[i].split(".")[0]) {
            obraz = String(fileIcons[i])

            return obraz
        }
    }
    return obraz
}