import React, {Component} from 'react';
import {Upload, Button, Icon} from 'antd';
import './InputButton.css'

export default ({onSend}) => {

    return (
        <div className="input-button">
            <Upload>
                <Button>
                    <Icon type="paper-clip"/>
                </Button>
            </Upload>
            <Button
                type="primary"
                onClick={onSend}
            >
                Send
            </Button>
        </div>
    );
}