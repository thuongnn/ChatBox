import React from 'react';
import ReactDOM from 'react-dom'
import {Button} from 'antd';
import './InputButton.css'

export default ({onSend, handleUpload, isLoadingUploadFile}) => {
    let fileInputNode;
    const handleFileInput = (e) => {
        let file = e.target.files[0];
        if (file) handleUpload(file);
    };

    return (
        <div className="input-button">
            <input
                type='file'
                ref={node => fileInputNode = node}
                onChange={handleFileInput}
                style={{display: 'none'}}
            />
            <Button
                shape="circle"
                icon="paper-clip"
                size="default"
                loading={
                    !(isLoadingUploadFile === 0
                        || isLoadingUploadFile === 100
                        || isLoadingUploadFile === null)}
                onClick={() => {
                    const element = ReactDOM.findDOMNode(fileInputNode);
                    element.click()
                }}/>
            <Button
                type="primary"
                onClick={onSend}>
                Send
            </Button>
        </div>
    );
}