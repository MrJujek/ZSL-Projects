const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path")

app.use(express.static('static'))

app.use(express.urlencoded({
    extended: true
}));

app.post("/handlePost", function (req, res) {
    console.log(req.body)
    //res.setHeader("content-type", "text/plain")
    //res.setHeader("content-type", "text/html")
    res.setHeader("content-type", "application/json")
    res.send(req.body)
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})

//1.html