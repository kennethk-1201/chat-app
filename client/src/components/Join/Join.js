import { useState } from 'react';
import { Link } from 'react-router-dom';

import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import PersonIcon from '@material-ui/icons/Person';

const Join = props => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')

    return(
        <div className="join-inner-container">
            <h1 className="heading">Enter a room</h1>
            <div className="input-container">
                <MeetingRoomIcon className="icon" fontSize="inherit"/>
                <input placeholder="Room" className="join-input" type="text" onChange={e => setRoom(e.target.value)}/>
            </div>
            <div className="input-container">
                <PersonIcon className="icon" fontSize="inherit"/>
                <input placeholder="Name" className="join-input" type="text" onChange={e => setName(e.target.value)}/>                
            </div>
            <Link onClick={e => (!name|| !room) ? e.preventDefault(): null} to={`/chat?name=${name}&room=${room}`}>
                <button className="button mt-20" type="submit">Join</button>
            </Link>
        </div>
    )
}

export default Join;