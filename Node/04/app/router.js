const controller = require("./controller.js");
const utils = require("./utils.js");
const fs = require("fs");

const knownExtensions = ["css", "js", "html"];
const router = async (request, response) => {

    switch (request.method) {
        case "GET":
            console.log("GET");
            console.log(request.url);

            if (request.url == "/") {
                fs.readFile("./app/views/index.html", function (error, data) {
                    console.log(data);
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.write(data);
                    response.end();
                })
            } else {
                let extension = request.url.split(".")[request.url.split(".").length - 1];
                console.log("extension: ", extension);

                if (knownExtensions.includes(extension)) {
                    fs.readFile("./app/views" + request.url, function (error, data) {
                        console.log(data);
                        response.writeHead(200, { 'Content-Type': controller.getExtensionType(extension) });
                        response.write(data);
                        response.end();
                    })
                } else {
                    response.writeHead(404, { 'Content-Type': 'text/html' });
                    response.write("<h1>ERROR 404<h1>");
                    response.end();
                }
            }

            break;

        case "POST":
            if (request.url == "/add") {
                // odczytaj dane z body
                // użyj funkcji z controllera
                // odpowiedz do klienta
                let data = await getRequestData(request);
                console.log("data:", data);
                controller.add(data)
            }
            else if (request.url == "/getall") {
                response.writeHead(200, { "Content-type": "application/json" });
                response.end(JSON.stringify({ allAnimals: controller.getall() }, null, 5));
            }
            else if (request.url == "/delete") {
                //  usuń dane z tablicy zwierząt i odpowiedz do klienta
            }
            else if (request.url == "/update") {
                //  updatuj danye z tablicy zwierząt i odpowiedz do klienta
            }

            break;
    }
}

module.exports = router