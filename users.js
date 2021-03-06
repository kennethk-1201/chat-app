// helper functions
const users = [];

const addUser = ({ id, name, room }) => {
    // trim variables ( eg. Example Name => examplename )
    name = name.trim()
    room = room.trim()

    // check if username exists in the room
    const existingUser = users.find( user => user.room === room && user.name === name)

    if (existingUser) {
        return { error: 'Username is taken'};
    }

    const user = { id, name, room };
    users.push(user);

    return { user }
}

const removeUser = id => {
    const index = users.findIndex( user => user.id === id)
    return users.splice(index, 1)[0]
}

const getUser = id => {
    return users.find( user => user.id === id)
}

const getUsersInRoom = room => {
    return users.filter( user => user.room === room)
}

module.exports = { addUser, removeUser, getUser, getUsersInRoom, users }