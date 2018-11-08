import React, {Component} from 'react';
import {Row, Col, Radio} from 'antd';
import './App.css';

import WithLayout from '../../components/WithLayout';

class App extends Component {
    render() {
        return (
            <Row className="app-chatbox">
                <Col className="col-select-group" span={6}>
                    <Radio.Group style={{display: 'flex', flexDirection: 'column'}} defaultValue="a" buttonStyle="solid">
                        <Radio.Button value="a">Hangzhou</Radio.Button>
                        <Radio.Button value="b">Shanghai</Radio.Button>
                        <Radio.Button value="c">Beijing</Radio.Button>
                        <Radio.Button value="d">Chengdu</Radio.Button>
                    </Radio.Group>
                </Col>
                <Col span={18}>

                </Col>
            </Row>
        );
    }
}

export default WithLayout(App);