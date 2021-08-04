import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './SidebarChat.css';
import { Link } from 'react-router-dom';

function SidebarChat({ id, name, addNewChat, chat }) {
    const [seed, setSeed] = useState();

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 10));

    }, [])


    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className='sidebarChat'>
                <Avatar src={`https://robohash.org/${name}/?set=set${seed}`} />
                <div className="sidebar__info">
                    <h2>{name}</h2>
                </div>

            </div>
        </Link>
    ) : (
        <div onClick={chat} className='sidebarChat'>
            <h2>Add New Chat</h2>

        </div>
    )
}

export default SidebarChat
