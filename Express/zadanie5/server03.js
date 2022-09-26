const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path")

app.use(express.static('static'))

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.post("/post", function (req, res) {
    console.log(req.body)
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})