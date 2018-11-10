import React, {Component} from 'react';
import {Input} from 'antd';
import * as DBFirebase from '../../../modules/DBFirebase';
import './InputField.css';

import InputButton from './InputButton';

const {TextArea} = Input;

class InputField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }
    }

    sendMessage = () => {
        const { user, groupId } = this.props;
        const { message } = this.state;

        const messageObject = DBFirebase.makeMessage(
            DBFirebase.messageTypes.TEXT,
            message,
            user
        );

        if(messageObject) DBFirebase.addMessage(groupId, messageObject);

        console.log(messageObject);

        this.setState({ message: '' });
    };

    handleKeyDown = (event) => {
        if (event.keyCode === 13 && !event.shiftKey) {  // if enter with no shift get pressed
            event.preventDefault();
            event.stopPropagation();
            this.sendMessage();
        }
    };


    render() {
        const state = this.state;

        return (
            <div className="input-field-outerContainer">
                <div className="input-field-container">
                    <TextArea
                        placeholder="Enter the message"
                        autosize
                        value={state.message}
                        onChange={e => this.setState({message: e.target.value})}
                        onKeyDown={this.handleKeyDown}
                    />
                    <InputButton
                        onSend={this.sendMessage}
                    />
                </div>
            </div>
        );
    }
}

export default InputField;