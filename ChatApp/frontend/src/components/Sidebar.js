import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import { Avatar, Button } from "@material-ui/core";
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';
import axios from '../axios';
import { Link } from 'react-router-dom';
import { auth } from '../firebase'

function Sidebar() {

    const [rooms, setRooms] = useState([]);
    const [{ user }, dispatch] = useStateValue();
    // const [{ }, dispatch] = useStateValue();//imported from the state Provider


    useEffect(() => {
        axios.get("/rooms").then(response => {
            setRooms(response.data);

        }).catch(err => console.log(err));

    }, [rooms])

    const createChat = () => {
        const rName = prompt("Please enter name for the chat");
        const newRoom = {
            roomName: rName,
        }

        if (rName) {
            axios.post('/rooms', newRoom).then(response => {
                setRooms([...rooms, newRoom])
            }).catch(err => console.log(err));
        }

    }


    const LogOut = () => {
        auth.signOut()
            .then(() => {
                dispatch({
                    type: actionTypes.DELETE_USER,

                });

            })
            .catch((err) => {
                alert(err.message)
            })

    }






    return (
        <div className="sidebar">
            {/* Sidebar header */}
            <div className="sidebar__header">
                <Avatar src={`${user?.photoURL}`} />
                <div className="sidebar__headerRight">

                    <Button onClick={LogOut}>LOG OUT</Button>

                </div>
            </div>

            {/* Sidebar Search */}
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input type="text" placeholder="Search or start new " />

                </div>
            </div>

            {/* Sidebar chats */}
            <div className="sidebar__chats">

                {/* for add new chat one */}
                <SidebarChat addNewChat chat={createChat} />
                {
                    rooms.map(room => (
                        <SidebarChat id={room._id} name={room.roomName} />
                    ))
                }

            </div>
        </div>
    )
}


export default Sidebar;
