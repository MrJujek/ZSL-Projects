const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path")

let users = ["111@w.pl", "222@w.pl", "333@w.pl"]

app.use(express.urlencoded({ extended: true }));

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
    let count = 0

    if (users.length == 0) {
        res.send('nie usunieto<br><a href="/">cofnij</a>')
    }

    if (typeof req.body.usuwanie === "string") {
        let index = users.findIndex(element => element == req.body.usuwanie)
        users.splice(index, 1)
        count = 1
    }
    else {
        console.log(req.body.usuwanie)
        for (let i = 0; i < req.body.usuwanie.length; i++) {
            let index = users.findIndex(element => element == req.body.usuwanie[i])
            users.splice(index, 1)
            count += 1
        }
    }
    res.send('usunieto ' + count + ' rekordow<br><a href="/">cofnij</a > ')
})

app.get("/removeUserBySelect", function (req, res) {
    let html = '<form action="/usuniete" method="POST"><select name="usuwanie">'
    for (let i = 0; i < users.length; i++) {
        html += '<option value=' + users[i] + '>' + users[i] + '</option>'
    }
    html += '<br><input type="submit" value="submit"></select></form>'
    res.send(html)
})

app.get("/removeUserByCheckbox", function (req, res) {
    let html = '<form action="/usuniete" method="POST">'
    for (let i = 0; i < users.length; i++) {
        html += '<input type="checkbox" name="usuwanie" value="' + users[i] + '">' + users[i] + '<br>'
    }
    html += '<br><input type="submit" value="submit"></select></form>'
    res.send(html)
})

app.get("/removeUserByRadio", function (req, res) {
    let html = '<form action="/usuniete" method="POST">'
    for (let i = 0; i < users.length; i++) {
        html += '<input type="radio" name="usuwanie" value="' + users[i] + '">' + users[i] + '<br>'
    }
    html += '<br><input type="submit" value="submit"></select></form>'
    res.send(html)
})

app.get("/reset", function (req, res) {
    users = ["111@w.pl", "222@w.pl", "333@w.pl"]
    res.redirect("/")
})

app.use(express.static('static'))

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})