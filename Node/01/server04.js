const fs = require("fs");
const http = require("http");
require("colors");
const PORT = 3000;
const server = http.createServer((req, res) => {
    console.log(("adres: ", req.url).green);

    let extension = req.url.split(".")[req.url.split(".").length - 1];
    let knownExtensions = ["css", "js", "html"];
    if (knownExtensions.includes(extension)) {
        fs.readFile("static" + req.url, function (error, data) {
            res.writeHead(200, { 'Content-Type': getExtensionType(extension) });
            res.write(data);
            res.end();
        })
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write("<h1>ERROR 404<h1>");
        res.end();
    }
})

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