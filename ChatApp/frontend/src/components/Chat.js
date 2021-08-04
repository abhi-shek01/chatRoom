import { Avatar, Button } from '@material-ui/core';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import React, { useEffect, useState } from 'react';
import "./Chat.css";
import axios from '../axios';
import { Link, useParams } from 'react-router-dom';
import Pusher from 'pusher-js';
import Messages from './Messages';
import { useStateValue } from '../StateProvider';
// import firebase from 'firebase';

function Chat() {

    const [input, setInput] = useState("");
    const [date, setDate] = useState("");
    const { roomId } = useParams();
    const [RoomName, setRoomName] = useState("");
    const [messages, setMessage] = useState([]);
    const [name, setName] = useState("");

    const [{ user }] = useStateValue();

    const [seed, setSeed] = useState();

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 10));

    }, [])



    useEffect(() => {
        if (roomId) {
            axios.get(`/rooms/${roomId}`).then(response => {
                setMessage(response.data.messages)

            }).catch(err => console.log(err))

        }

    }, [roomId])





    useEffect(() => {
        if (roomId) {
            axios.get(`/rooms`).then(response => {
                setRoomName(response.data);

                // console.log(RoomName)
                // setMessage([])
                for (let i = 0; i < RoomName.length; i++) {
                    if (RoomName[i]._id === roomId) {
                        setName(RoomName[i].roomName)
                        // setMessage(RoomName[i].messages)
                    };
                }


            }).catch(err => console.log(err))
        }

    }, [RoomName.length])

    useEffect(() => {
        if (roomId) {
            axios.get(`/rooms`).then(response => {
                setRoomName(response.data);

                // console.log(RoomName)
                // setMessage([])
                for (let i = 0; i < RoomName.length; i++) {
                    if (RoomName[i]._id === roomId) {
                        setName(RoomName[i].roomName)
                        setMessage(RoomName[i].messages)
                    };
                }


            }).catch(err => console.log(err))
        }

    }, [roomId])






    useEffect(() => {


        var pusher = new Pusher('1a500b9deb8698dd3b7d', {
            cluster: 'ap2'
        });


        const channel = pusher.subscribe("messages");
        channel.bind("updated", (newMessages) => {
            setMessage([...messages, newMessages]);
        });


        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };




    }, [messages]);



    //console.log(roomId);









    const sendMessage = (e) => {
        e.preventDefault();
        let d = new Date();
        let h = d.getHours();
        let m = d.getMinutes();

        setDate(h + ":" + m);
        console.log(date);
        // // console.log(input);
        let sendInput = input;

        clearInput();
        axios.post(`/rooms/${roomId}/messages`, {
            message: sendInput,
            name: user.displayName,
            timestamp: date,
            received: false,
        }).then((response) => {
            console.log(response.data);
            // setMessage();
        }

        ).catch(err => console.log(err))

    };

    const clearInput = () => {
        setInput("");
    }
    return (
        <div className="chat">
            {/* chat header */}
            <div className="chat__header">
                <Avatar src={`https://robohash.org/${name}/?set=set${seed}`} />
                <div className="chat__headerInfo">
                    <h3>{name}</h3>

                </div>
                <div className="chat__headerRight">
                    <Link to='/home'>
                        <Button>CLOSE CHAT</Button>
                    </Link>
                </div>
            </div>

            {/* chat body */}
            <Messages messages={messages} user={user} />

            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input value={input}
                        onChange={e => setInput(e.target.value)}
                        type="text" placeholder="Type a message" />
                    <button onClick={sendMessage} type="submit">Send</button>
                </form>
                <MicIcon />

            </div>
        </div>
    )
}

export default Chat
