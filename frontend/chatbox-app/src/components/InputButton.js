import React, {Component} from 'react';
import {Upload, Button, Icon} from 'antd';
import './InputButton.css'

class InputButton extends Component {
    render() {
        return (
            <div className="input-button">
                <Upload>
                    <Button>
                        <Icon type="paper-clip"/>
                    </Button>
                </Upload>
                <Button type="primary">
                    Send
                </Button>
            </div>
        );
    }
}

export default InputButton;