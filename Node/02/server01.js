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
    let body = "";

    req.on("data", function (data) {
        console.log("data: " + data)
        body += data.toString();
    })

    req.on("end", function (data) {

        console.log(body)
        res.writeHead(200, { "Content-type": "text/plain;charset=utf-8" });
        res.end(body);

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