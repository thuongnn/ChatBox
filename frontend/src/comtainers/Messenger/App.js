import React, {Component} from 'react';
import WithLayout from '../../components/WithLayout';
import GroupChat from './GroupChat';
import ChatBox from './ChatBox';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="app-chat">
                <div className="col-select-group">
                    <GroupChat/>
                </div>
                <div className="col-main-chat">
                    <ChatBox/>
                </div>
            </div>
        );
    }
}

export default WithLayout(App);