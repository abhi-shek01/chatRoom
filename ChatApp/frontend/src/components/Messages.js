import React from 'react'
import './Messages.css'

function Messages({ messages, user }) {
    // console.log(messages)

    return (
        <div className="chat__body">
            {messages.map(message => (
                <p className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}>
                    <span className="chat__name">{message.name}</span>
                    {message.message}
                    <span className="chat__timestamp">{message.timestamp}</span>
                </p>

            ))
            }


        </div>
    )
}

export default Messages
