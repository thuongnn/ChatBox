import React, {Component} from 'react';
import {Divider} from "antd";
import InputField from "../InputField";
import MessagesArea from '../MessagesArea'

import './Chat.css';

class Chat extends Component {
    render() {
        return (
            <div className="chat-container">
                <div className="chat-chatbox">
                    <MessagesArea/>
                    <Divider style={{flex: '0 0 auto', margin: '0'}}/>
                    <InputField/>
                </div>
            </div>
        );
    }
}

export default Chat;