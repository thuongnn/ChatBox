import React, {Component} from 'react';
import {Row, Col, Radio, Divider} from 'antd';
import './App.css';

import InputField from './InputField'
import WithLayout from '../../components/WithLayout';

class App extends Component {
    render() {
        return (
            <Row className="app-chatbox">
                <Col className="col-select-group" span={6}>
                    <Radio.Group className="flex-column" defaultValue="a" buttonStyle="solid">
                        <Radio.Button value="a">Hangzhou</Radio.Button>
                        <Radio.Button value="b">Shanghai</Radio.Button>
                        <Radio.Button value="c">Beijing</Radio.Button>
                        <Radio.Button value="d">Chengdu</Radio.Button>
                        <Radio.Button value="d">Chengdu</Radio.Button>
                        <Radio.Button value="d">Chengdu</Radio.Button>
                        <Radio.Button value="d">Chengdu</Radio.Button>
                        <Radio.Button value="d">Chengdu</Radio.Button>
                    </Radio.Group>
                </Col>
                <Col className="flex-column" span={18}>
                    <Row className="message-area">

                    </Row>
                    <Row className="input-field">
                        <InputField></InputField>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default WithLayout(App);