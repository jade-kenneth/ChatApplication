import React from 'react'
import '../Message/scss/message.css';
import {format} from 'timeago.js';
const Message = ({time, message, messageOwner, name}) => {
    let date = new Date();
    return (
        <div className="message-container">
                <div className={messageOwner ? "message-content own" : "message-content"}>
                    <div className={messageOwner ? "custom-avatar" : "custom-avatar"}>
                        <h2>{ messageOwner ? 'ME' : `${name}`}</h2>
                    </div>
                    <div className="message">
                        <h3>{message}</h3>
                    </div>
                </div>
                <div className="message-time">
                    <h5>{format(time)}</h5>
                </div> 
        </div>
    )
}

export default Message
