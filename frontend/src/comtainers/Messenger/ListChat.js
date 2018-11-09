import React, {Component} from 'react';
import {Radio} from 'antd';

import './ListChat.css';

class ListChat extends Component {
    render() {
        return (
            <div className="radio-group">
                <Radio.Group defaultValue="a" buttonStyle="solid">
                    <Radio.Button value="a">Hangzhou</Radio.Button>
                    <Radio.Button value="b">Shanghai</Radio.Button>
                    <Radio.Button value="c">Beijing</Radio.Button>
                    <Radio.Button value="d">Chengdu</Radio.Button>
                    <Radio.Button value="d">Chengdu</Radio.Button>
                    <Radio.Button value="d">Chengdu</Radio.Button>
                    <Radio.Button value="d">Chengdu</Radio.Button>
                    <Radio.Button value="d">Chengdu</Radio.Button>
                </Radio.Group>
            </div>
        );
    }
}

export default ListChat;