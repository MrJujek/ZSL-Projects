const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path")
const bodyParser = require("body-parser")

let users = ["111@w.pl", "222@w.pl", "333@w.pl"]
let count = 0

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/addUser.html"))
})



app.post("/", function (req, res) {
    let email = req.body.email

    if (!users.includes(email)) {
        users.push(email)

        let html = 'Ten mail zostal dodany do bazy'
        res.send(html)
    } else {
        let html = 'Ten mail jest juz w bazie'
        res.send(html)
    }

    console.log(users.includes(email))
    console.log(users)

})

app.post("/usuniete", function (req, res) {
    let html = 'usunieto ' + count + ' rekordow'
    count = 0
    res.send(html)

})

app.post("/removeUserBySelect", function (req, res) {
    let html = '<form action="/usuniete" method="POST"><select name="lista">'
    for (let i = 0; i < users.length; i++) {
        html += '<option value=' + users[i] + '>' + users[i] + '</option>'
    }
    html += '<br><input type="submit" value="submit"></select></form>'
    count++
    res.send(html)

})

app.use(express.static('static'))

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})