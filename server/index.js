const express = require('express');

const socketio = require('socket.io');
const http = require('http');

const { addUser, removeUser, getUser, getUsersInRoom, users } = require('./users')

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
    // console.log('We have a new connection');

    // new socket handling
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });
        console.log(users)

        // error handler
        if(error) return callback(error);

        console.log(`${user.name} joined ${user.room}`)

        // send message to the current socket
        socket.emit('message', { user: 'Admin', text:`${user.name}, welcome to room ${user.room}`});
        
        // broadcast message to all current sockets in the room
        socket.broadcast.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has joined!`});
        
        // join current socket to the room
        socket.join(user.room);

        // run callback
        callback();
    })

    // message handling
    socket.on('sendMessage', (message, callback) => {

        console.log(socket.id);

        // find user with id
        const user = getUser(socket.id);

        // broadcast message to all sockets in the room
        io.to(user.room).emit('message', { user: user.name, text: message });

        // run callback
        callback();
    })

    // broadcast user left
    socket.on('disconnect', () => {
        let user = getUser(socket.id);
        console.log(users)
        removeUser(socket.id);
        try {
            socket.broadcast.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left!`});
            console.log(`${user.name} had left room ${user.room}`);
        } catch(e) {
            console.log(e);
            console.log(`User has left the room`);
        }
    })
});

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))