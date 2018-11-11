import React from 'react';
import {Avatar} from 'antd';
import * as index from '../../../utils/Index';
import * as MessageContent from './components/MessageContent';
import './Message.css'

import {messageTypes} from '../../../modules/DBFirebase';

export default ({message, isOwned}) => {

    let messageContent;

    switch (message.type) {
        case messageTypes.TEXT:
            messageContent = <MessageContent.Text
                isOwned={isOwned}
                timestamp={message.timestamp}
            >{message.content}</MessageContent.Text>;
            break;
        case messageTypes.FILE:
            messageContent = <MessageContent.File
                isOwned={isOwned}
                timestamp={message.timestamp}
                file={message.content}/>;
            break;
        default:
            messageContent = <div>{`Undefined message type: ${message.type}`}</div>
    }

    return isOwned ? (
        <div className="ownedContainer">
            <div className="ownedMessage">
                {messageContent}
                <p className="userName">{index.timestampToDateTime(message.timestamp)}</p>
            </div>
        </div>
    ) : (
        <div className="unownedContainer">
            <a href="#">
                <Avatar style={{backgroundColor: "#f56a00", verticalAlign: 'middle'}} size="large">
                    {message.from.username.charAt(0).toUpperCase()}
                </Avatar>
            </a>
            <div className="unownedMessage">
                {messageContent}
                <p className="userName">{index.timestampToDateTime(message.timestamp)}</p>
            </div>
        </div>
    )
}