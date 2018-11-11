import React, {Component} from 'react';
import {Divider} from "antd";
import InputField from "../../components/Chatbox/InputField/InputField";
import MessagesArea from '../../components/Chatbox/MessagesArea/MessagesArea'

import './Chatbox.css';

class ChatBox extends Component {
    render() {
        const props = this.props;

        return (
            <div className="chat-container">
                <div className="chat-chatbox">
                    <MessagesArea {...props}/>
                    <Divider style={{flex: '0 0 auto', margin: '0'}}/>
                    <InputField {...props}/>
                </div>
            </div>
        );
    }
}

export default ChatBox;