const { log } = require("console");
const fs = require("fs");
const http = require("http");
require("colors");
const PORT = 3000;
const Datastore = require('nedb')

const server = http.createServer((req, res) => {
    let extension = req.url.split(".")[req.url.split(".").length - 1];
    let knownExtensions = ["css", "js", "html"];

    switch (req.method) {
        case "GET":
            console.log("GET");

            if (knownExtensions.includes(extension)) {
                fs.readFile("static" + req.url, function (error, data) {
                    //console.log(data);
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

let saveInterval, readInterval
function serverResponse(req, res) {
    let body;
    req.on("data", function (data) {
        body = JSON.parse(data);
    })
    req.on("end", function (data) {
        console.log("body:", body)

        const database = new Datastore({
            filename: 'database.db',
            autoload: true
        });

        if (body.read == true) {
            readInterval = setInterval(() => {
                return new Promise((resolve, reject) => {
                    try {
                        database.find({}, (err, docs) => {
                            resolve(docs)
                        });
                    } catch (error) {
                        reject(error.message)
                    }
                })
            }, 1000)

        } else if (body.read == false) {
            clearInterval(readInterval)
        }

        if (body.save == true) {
            saveInterval = setInterval(() => {
                const data = {
                    total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024 * 100) / 100 + " MB",
                    used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100 + " MB"
                };

                database.insert(data, function (err, newDoc) {
                    console.log(newDoc)
                });
            }, 1000);

        } else if (body.save == false) {
            clearInterval(saveInterval)
        }
    })

    res.writeHead(200, { "Content-type": "application/json" });
    res.end(JSON.stringify({ elo: "elo" }, null, 5));
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