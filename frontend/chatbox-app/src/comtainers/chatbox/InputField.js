import React, {Component} from 'react';
import {Input} from 'antd';
import './InputField.css';

const { TextArea } = Input;

class InputField extends Component {
    render() {
        return (
            <div className="main-input-field">
                <div className="container">
                    <TextArea placeholder="Autosize height with minimum and maximum number of lines" autosize={true} />
                </div>
            </div>
        );
    }
}

export default InputField;