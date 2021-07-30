import { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState([]);
    const [messages, setMessages] = useState([]);
    const endpoint = process.env.REACT_APP_NUS_API;

    useEffect(() => {
        const { name, room } = queryString.parse(location.search)
        console.log('url', location.search)
    
        // connect to API
        socket = io(endpoint);
        console.log(socket)

        // set state
        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, ( error ) => {

        })

        // when component dies
        return () => {
            socket.disconnect();
            socket.off();
        }
    }, [endpoint, location.search]);

    useEffect(() => {
        socket.on('message', message => {
            // append to messages array
            console.log('received message', message);
            setMessages([...messages, message]);
        })
    }, [messages]);

    // function for sending messages
    const sendMessage = e => {
        e.preventDefault();

        if (message){
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    return(
        <div className="container">
            <input
                className="message-input" 
                value={message} 
                onChange={e => setMessage(e.target.value)}
                onKeyPress={e => e.key === "Enter" ? sendMessage(e) : null}
            />
            <ul>
                {messages.map((msg, index) => {
                    return <li key={index}>
                        {msg.user} : {msg.text}
                    </li>
                })}
            </ul>
        </div>
    )
}

export default Chat;