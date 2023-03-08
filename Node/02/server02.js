const fs = require("fs");
const http = require("http");
require("colors");
const PORT = 3000;

const server = http.createServer((req, res) => {
    console.log(("adres: ", req.url).green);

    let extension = req.url.split(".")[req.url.split(".").length - 1];
    console.log("extension: ", extension);
    let knownExtensions = ["css", "js", "html"];

    switch (req.method) {
        case "GET":
            console.log("GET");
            console.log("static" + req.url);

            if (knownExtensions.includes(extension)) {
                fs.readFile("static" + req.url, function (error, data) {
                    console.log(data);
                    res.writeHead(200, { 'Content-Type': getExtensionType(extension) });
                    res.write(data);
                    res.end();
                })
            } else {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.write("<h1>ERROR 404<h1>");
                res.end();
            }

            break;
        case "POST":
            console.log("POST");
            serverResponse(req, res)

            break;
    }



})

function serverResponse(req, res) {
    let body;

    req.on("data", function (data) {
        console.log("data: " + data)
        console.log(JSON.parse(data))
        body = JSON.parse(data);
    })

    req.on("end", function (data) {

        console.log("body:", body)

        let a = body.a
        let b = body.b
        let operation = body.operation;
        console.log(a, b, operation);

        switch (operation) {
            case "add":
                body = parseInt(a) + parseInt(b);
                break;
            case "sub":
                body = parseInt(a) - parseInt(b);
                break;
            case "mul":
                body = parseInt(a) * parseInt(b);
                break;
            case "div":
                body = parseInt(a) / parseInt(b);
                break;
            case "all":
                let obj = {
                    add: parseInt(a) + parseInt(b),
                    sub: parseInt(a) - parseInt(b),
                    mul: parseInt(a) * parseInt(b),
                    div: parseInt(a) / parseInt(b)
                }
                body = obj
        }
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(JSON.stringify(body, null, 5));
    })
}

function getExtensionType(extension) {
    switch (extension) {
        case "css":
            return "text/css";
        case "js":
            return "text/javascript";
        case "html":
            return "text/html";
        default:
            return "text/plain";
    }
}

server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`.red)
});