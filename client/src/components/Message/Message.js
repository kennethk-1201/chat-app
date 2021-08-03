const Message = props => {
    const {msg, index, name} = props;

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

    return <div className={(name===msg.user ? "message-sent": "message-received")} key={index} >
        <div className={`message ${index === 0 ? 'fade-in' : ''}`} id={index}>
            <p className="message-user" style={{color: colorMapper(msg.user)}}>{name===msg.user ? "You": msg.user }</p>
            <p className="message-text">{msg.text}</p>
        </div>
    </div>
}
export { Message }; 