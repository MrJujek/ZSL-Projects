const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path")
const fs = require("fs")
const hbs = require('express-handlebars');
const { addAbortSignal } = require("stream");
app.use(express.json());

app.use(express.static('static'))
app.use(express.static('static/cwiczenia'))

app.use(express.urlencoded({
    extended: true
}));

let users = []

app.get("/", function (req, res) {
    res.render("index.html")
})

app.post("/ADD_USER", (req, res) => {
    console.log(req.body);
    res.setHeader('content-type', 'application/json');
    console.log(req.body.nick);
    console.log(users);
    if (users.length < 2) {
        if (users.includes(req.body.nick)) {
            res.end(JSON.stringify("userExists"));
        } else {
            console.log("Nie ma");
            users.push(req.body.nick)
            if (users.length == 1) {
                res.end(JSON.stringify("1"));
            } else {
                res.end(JSON.stringify("2"));
            }
        }
    } else {
        res.end(JSON.stringify("gameFull"));
    }
})

app.post("/RESET", (req, res) => {
    users = []
    console.log(req.body);
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify("cleared"));
})


app.listen(PORT, function () {
    console.log("server start on port " + PORT)
})