const express = require('express');

const socketio = require('socket.io');
const http = require('http');

const router = require('./router');

// set up server

const PORT = process.env.PORT || 5000

const app = express();
const server = http.createServer(app);

const corsOptions={
    cors: true,
    origins:["http://localhost:3000"],
}

const io = socketio(server, corsOptions);

// listeners

io.on('connection', (socket) => {
    console.log('We have a new connection');

    socket.on('join', ({ name, room }, callback) => {
        console.log(name, room);
    })

    socket.on('disconnect', () => {
        console.log('User had left');
    })
});

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))