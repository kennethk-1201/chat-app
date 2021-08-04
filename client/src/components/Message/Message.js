import {useEffect, useRef} from "react";

const Message = props => {
    const {msg, index, name} = props;
    const msgElem = useRef(null);

    // map username to color
    const colorMapper = (user) => {
        switch (user){
            case 'Admin':
                return 'blue';
            case name:
                return 'red';
            default:
                return 'black';
        }
    }

    useEffect(() => {
        if (index === 0) {
            msgElem.current.className='message d-none'
                setTimeout(() => {
                console.log(msgElem.current.className)
                msgElem.current.className='message fade-in'
                console.log(msgElem.current.className)
            }, 10)
        }
        // eslint-disable-next-line
    }, [msg])

    return <div className={(name===msg.user ? "message-sent": "message-received")} key={index} >
        <div 
            className={`message ${index === 0? 'd-none': ''}`} 
            id={index}
            ref={msgElem}
        >
            <p className="message-user" style={{color: colorMapper(msg.user)}}>{name===msg.user ? "You": msg.user }</p>
            <p className="message-text">{msg.text}</p>
        </div>
    </div>
}
export { Message }; 