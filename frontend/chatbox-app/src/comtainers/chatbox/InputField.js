import React, {Component} from 'react';
import {Input} from 'antd';
import './InputField.css';

import InputButton from '../../components/InputButton';

const {TextArea} = Input;

class InputField extends Component {
    render() {
        return (
            <div className="input-field-outerContainer">
                <div className="input-field-container">
                    <TextArea placeholder="Enter the message" autosize/>
                    <InputButton/>
                </div>
            </div>
        );
    }
}

export default InputField;