const express = require('express');
const app = express();
const http = require('http');


const server = http.createServer(app); // tu zmiana

const { Server } = require("socket.io");
const socketio = new Server(server);

let users = [];
socketio.on('connection', (client) => {
    console.log("klient się podłączył z id = ", client.id)
    //console.log(socketio.sockets);
    // client.id - unikalna nazwa klienta generowana przez socket.io
    users.push(client.id)

    socketio.emit("usery", {
        users:users
     })

    client.emit("onconnect", {
        clientId:client.id
     })

     client.on("disconnect", (reason) => {
        console.log("klient "+client.id+" się rozłącza", reason)
        for (let i = 0; i < users.length; i++) {
            if (users[i] == client.id) {
                users.splice(i, 1);
            }
        }

        socketio.emit("usery", {
            users:users
         })
     })

     client.on("mouseposition", (data) => {
        client.broadcast.emit("mouseposition", { posX: data.posX, posY: data.posY });
     })
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});



server.listen(3000, () => {
    console.log('server listening on 3000');
});