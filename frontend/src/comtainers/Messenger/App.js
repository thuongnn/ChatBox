import React, {Component} from 'react';
import LocalStorage from '../../utils/LocalStorage';
import {AuthService} from '../../modules/AuthenFirebase';
import History from '../../utils/History';
import {message, Button} from "antd";

import WithLayout from '../../components/WithLayout';
import ListGroup from './ListGroup';
import ListMember from './ListMember';
import ChatBox from './ChatBox';
import './App.css';

const authService = new AuthService();

class App extends Component {
    state = {
        currentGroupId: '',
        session: LocalStorage.get("session")
    };

    componentDidMount() {
        const session = this.state.session;
        if (!session) {
            message.error("You must login first !")
            History.push('/login');
        } else {
            authService.access_token = session.firebase.access_token;
            authService.loginFirebase();
        }
    }

    setCurrentGroupId = (currentGroupId) => this.setState({currentGroupId});

    onClickLogout = () => {
        LocalStorage.clear();
        authService.logoutFirebase();
        History.push('/login');
    };

    render() {
        const state = this.state;

        if (!state.session) return "";

        return (
            <div onMouseMove={() => {
                authService.mouseMove()
            }}>
                <div className="app-control">
                    <Button type="primary" onClick={this.onClickLogout}>Log out</Button>
                </div>
                <div className="app-chat">
                    <div className="col-select-group">
                        <ListGroup
                            session={state.session}
                            setCurrentGroupId={this.setCurrentGroupId}
                            currentGroupId={state.currentGroupId}
                        />
                    </div>
                    <div className="col-main-chat">
                        <ChatBox
                            currentUser={state.session.user}
                            currentGroupId={state.currentGroupId}
                        />
                    </div>
                    <div className="col-select-member">
                        <ListMember
                            session={state.session}
                            currentGroupId={state.currentGroupId}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default WithLayout(App);