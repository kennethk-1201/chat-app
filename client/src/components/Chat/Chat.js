import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import queryString from 'query-string';
import io from 'socket.io-client';
import _ from "lodash";

import { Message } from "../Message/Message";

import Picker from 'emoji-picker-react';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SendIcon from '@material-ui/icons/Send';

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState([]);
    const [messages, setMessages] = useState([]);
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [displayEmoji, setDisplayEmoji] = useState(false);

    const latestMessages = useRef(messages);
    const history = useHistory();
    
    const endpoint = process.env.REACT_APP_NUS_API;

    // init
    useEffect(() => {
        const { name, room } = queryString.parse(location.search)
    
        // connect to API
        socket = io(endpoint);

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

    // fix stale state
    useEffect(() => {
        latestMessages.current=messages
    }, [messages])

    // message listener
    useEffect(() => {
        socket.on('message', message => {
            if(!_.isEqual(latestMessages.current[0],message)){
                setMessages([message, ...latestMessages.current]);
            }
            var chatbox = document.getElementById("chat-container");
            chatbox.scrollTop = 0;
        })
        socket.on('disconnect', () => {
            history.push('/')
        })
        // eslint-disable-next-line
    }, [messages]);

    // emoji update
    useEffect(() => {
        if (chosenEmoji){
            setMessage(message + chosenEmoji.emoji)
        }
        // eslint-disable-next-line
    }, [chosenEmoji])

    // function for sending messages
    const sendMessage = e => {
        e.preventDefault();
        let newMessage = {user: name, text: message}
        if (message){
            setMessages([newMessage, ...messages]);
            setMessage('');
            setDisplayEmoji(false);

            socket.emit('sendMessage', message, () => {
            });
        }
    }



    // emoji callback
    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
    };

    return(
        <div className="chat-inner-container" id="chat-container">
            <div className="chat-heading" >{room}</div>
            <div className="chat-list">
                {messages.map((msg, index) => {
                    return <Message msg={msg} index={index} name={name}/>
                })}
                <div className="chat-intro">
                    Messages will disappear when you close the window.
                </div>
            </div>
            <div className={displayEmoji ? "emoji-container":"emoji-container-close"}>
                <Picker onEmojiClick={onEmojiClick} />
            </div>
            <div className="input-holder">
                <div className="message-input">
                    <InsertEmoticonIcon onClick={() => setDisplayEmoji(!displayEmoji)}/>
                    <input
                        className="message-field"
                        value={message} 
                        placeholder="Enter your message"
                        onChange={e => setMessage(e.target.value)}
                        onKeyPress={e => e.key === "Enter" ? sendMessage(e) : null}
                    />     
                    <SendIcon onClick={sendMessage}/>
                </div>
            </div>
        </div>
    )
}

export default Chat;