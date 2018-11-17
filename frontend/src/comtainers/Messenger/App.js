import React, {Component} from 'react';
import LocalStorage from '../../utils/LocalStorage';
import * as Firebase from '../../modules/AuthenFirebase';
import History from '../../utils/History';
import {message, Button, InputNumber, Col, Row} from "antd";
import {joinGroup} from '../../modules/Group';

import WithLayout from '../../components/WithLayout';
import ListGroup from './ListGroup';
import ChatBox from './ChatBox';
import './App.css';

class App extends Component {
    state = {
        code: 0,
        currentGroupId: '',
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

    setCurrentGroupId = (currentGroupId) => this.setState({currentGroupId});

    onClickLogout = () => {
        LocalStorage.clear();
        Firebase.logoutFirebase();
        History.push('/login');
    };

    onClickJoinGroup = () => {
        const {code, session} = this.state;
        const memberId = session["user"]["id"];

        let data = {};
        data["memberId"] = memberId;
        data["code"] = code;

        joinGroup(data).then(() => {
            message.success("Join group successfully !")
        }).catch(err => {
            console.log(err);
            message.error("Join group failed !")
        })
    };

    render() {
        const state = this.state;

        if (!state.session) return "";

        return (
            <div>
                <Row className="app-control">
                    <Col span={18}>
                        <span>Code: </span><InputNumber value={state.code} onChange={(code) => this.setState({code})}/>
                        <Button style={{marginLeft: '5px'}} type="primary" onClick={this.onClickJoinGroup}>Join
                            group</Button>
                    </Col>
                    <Col span={6}>
                        <Button style={{float: 'right'}} type="primary" onClick={this.onClickLogout}>Log out</Button>
                    </Col>
                </Row>
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
                </div>
            </div>
        );
    }
}

export default WithLayout(App);