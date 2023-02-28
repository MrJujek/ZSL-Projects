const http = require("http");
const PORT = 3000;
const server = http.createServer((req, res) => {
    console.log("nagłowki żądania:")
    console.log(JSON.stringify(req.rawHeaders, null, 5))
    console.log(JSON.stringify(req.headers, null, 5))
    res.writeHead(200, { "content-type": "application/json;charset=utf-8" })
    res.end(JSON.stringify(req.headers, null, 5))
})

server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`)
});