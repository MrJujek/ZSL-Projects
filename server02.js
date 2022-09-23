const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path")

app.use(express.static('static'))

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/formularz.html"))
})



app.get("/handleForm", function (req, res) {
    let bg = req.query.kolor
    let html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title><style>body {background-color:' + bg + ';color: white}</style></head><body>' + bg + "</body></html>"

    res.send(html)


})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})