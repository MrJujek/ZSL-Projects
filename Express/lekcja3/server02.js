const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path")

app.use(express.static('static'))

app.use(express.urlencoded({
    extended: true
}));

app.post("/handlePost", function (req, res) {
    res.setHeader("Content-Type", "application/json")
    let suma = Number(req.body.pole1) + Number(req.body.pole2)
    let iloczyn = req.body.pole1 * req.body.pole2

    req.body.suma = suma
    req.body.iloczyn = iloczyn
    res.send(JSON.stringify(req.body, null, 5));
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})

//1.html