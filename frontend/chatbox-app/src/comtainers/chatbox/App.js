import React, {Component} from 'react';
import {Row, Col, Radio, Divider} from 'antd';
import './App.css';

import Group from './group/Group';
import Chat from './chat/Chat';
import InputField from './InputField';
import WithLayout from '../../components/WithLayout';

class App extends Component {
    render() {
        return (
            <div className="app-chat">
                <div className="col-select-group">
                    <Group/>
                </div>
                <div className="col-main-chat">
                    <Chat/>
                </div>
            </div>
        );
    }
}

export default WithLayout(App);