const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path")
const fs = require("fs")
const hbs = require('express-handlebars');

app.use(express.static('static'))
app.use(express.static('static/cwiczenia'))

app.use(express.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {
    res.render("index.html")
})

app.post("/ADD_USER", () => {

})


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})