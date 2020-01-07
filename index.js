const express = require('express');
const app = express();

const server = require('http').createServer(app);

const io = require('socket.io').listen(server);

server.listen(3000);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

connections = [];

io.sockets.on('connection', function(socket) {
    connections.push(socket);
    console.log("Connected");

    socket.on('disconnect', function(data) {
        connections.splice(connections.indexOf(socket), 1);
        console.log("Disconnected");
    });

    socket.on('send message', function(data) {
        io.sockets.emit('add message', {mess: data.mess, name: data.name, className: data.className});
    });

});
