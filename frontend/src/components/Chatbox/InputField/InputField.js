import React, {Component} from 'react';
import {Input} from 'antd';
import * as DBFirebase from '../../../modules/DBFirebase';
import * as StorageFirebase from '../../../modules/StorageFirebase';
import './InputField.css';

import InputButton from './InputButton';

const {TextArea} = Input;

class InputField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            isLoadingUploadFile: 0
        };
        this.upload = StorageFirebase.SingleUploadThread();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentGroupId !== this.props.currentGroupId)
            document.getElementById('input-typing-field').focus();
    }

    sendMessage = () => {
        const {currentUser, currentGroupId} = this.props;
        const {message} = this.state;

        const messageObject = DBFirebase.makeMessage(
            DBFirebase.messageTypes.TEXT,
            message,
            currentUser
        );

        if (messageObject) DBFirebase.addMessage(currentGroupId, messageObject);

        this.setState({message: ''});
    };

    handleKeyDown = (event) => {
        if (event.keyCode === 13 && !event.shiftKey) {  // if enter with no shift get pressed
            event.preventDefault();
            event.stopPropagation();
            this.sendMessage();
        }
    };

    handleUpload = async (file) => {
        if (file.size > StorageFirebase.MAXIMUM_FILE_SIZE) {
            // this.setState({alertFileIsTooLarge: true});
            return
        }
        this.upload.onProgress(progress => this.setState({isLoadingUploadFile: progress}));
        const {currentUser, currentGroupId} = this.props;
        const downloadURL = await this.upload.upFile(file, currentUser.id, currentGroupId);
        const messageObject = DBFirebase.makeMessage(
            DBFirebase.messageTypes.FILE,
            {
                name: file.name,
                downloadURL,
                type: file.type
            },
            currentUser
        );

        if (messageObject) DBFirebase.addMessage(currentGroupId, messageObject)
    };

    render() {
        const state = this.state;

        return (
            <div className="input-field-outerContainer">
                <div className="input-field-container">
                    <TextArea
                        id='input-typing-field'
                        placeholder="Enter the message"
                        autosize
                        value={state.message}
                        onChange={e => this.setState({message: e.target.value})}
                        onKeyDown={this.handleKeyDown}
                    />
                    <InputButton
                        onSend={this.sendMessage}
                        handleUpload={this.handleUpload}
                        isLoadingUploadFile={state.isLoadingUploadFile}
                    />
                </div>
            </div>
        );
    }
}

export default InputField;