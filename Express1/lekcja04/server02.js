const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path")
const formidable = require('formidable');

app.use(express.static('static'))

app.use(express.json());

app.post('/api', function (req, res) {
    console.log(req.body);
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify(req.body));
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})

//1.html