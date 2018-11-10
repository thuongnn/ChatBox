import React, {Component} from 'react';
import LocalStorage from '../../utils/LocalStorage';
import * as Firebase from '../../modules/AuthenFirebase';
import History from '../../utils/History';
import {message} from "antd";

import WithLayout from '../../components/WithLayout';
import ListChat from './ListChat';
import ChatBox from './ChatBox';
import './App.css';

class App extends Component {
    state = {
        session: LocalStorage.get("session")
    };

    componentDidMount() {
        const session = this.state.session;
        if (!session) {
            message.error("You must login first !")
            History.push('/login');
        } else {
            Firebase.loginFirebase(session.firebase.access_token);
        }
    }

    render() {
        return (
            <div className="app-chat">
                <div className="col-select-group">
                    <ListChat/>
                </div>
                <div className="col-main-chat">
                    <ChatBox/>
                </div>
            </div>
        );
    }
}

export default WithLayout(App);