import { useState } from 'react';
import { Link } from 'react-router-dom';

const Join = props => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')

    return(
        <div className="join-outer-container">
            <div className="join-inner-container">
                <h1 className="heading">Join</h1>
                <div><input placeholder="" className="join-input" type="text" onChange={e => setName(e.target.value)}/></div>
                <div><input placeholder="" className="join-input mt-20" type="text" onChange={e => setRoom(e.target.value)}/></div>
                <Link onClick={e => (!name|| !room) ? e.preventDefault(): null} to={`/chat?name=${name}&room=${room}`}>
                    <button className="button mt-20" type="submit">Sign In</button>
                </Link>
            </div>
        </div>
    )
}

export default Join;