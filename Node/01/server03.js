const http = require("http");
require("colors");
const PORT = 3000;
const server = http.createServer((req, res) => {
    console.log("nagłowki żądania:")
    console.log(JSON.stringify(req.rawHeaders, null, 5))
    console.log(JSON.stringify(req.headers, null, 5))
    res.writeHead(200, { "content-type": "text/html;charset=utf-8" })
    if (req.headers['sec-ch-ua'] == "\"Chromium\";v=\"110\", \"Not A(Brand\";v=\"24\", \"Microsoft Edge\";v=\"110\"") {
        res.end("Edge")
    } else if (req.headers['sec-ch-ua']) {
        res.end("Chrome")
    } else {
        res.end("Firefox")
    }

})

server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`.blue)
});