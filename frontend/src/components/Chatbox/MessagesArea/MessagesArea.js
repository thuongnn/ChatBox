import React, {Component} from 'react';
import * as ReactDOM from "react-dom";
import {Spin} from 'antd';
import * as DBFirebase from '../../../modules/DBFirebase';
import './MessagesArea.css';

import Message from './Message';

class MessagesArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            loading: true
        };
        this.dbListener = null;
    }

    componentDidMount() {
        this.dbListener = this.listenToMessagesData(this.props.currentGroupId);
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentGroupId !== this.props.currentGroupId) {
            DBFirebase.offMessagesDataChange(this.props.currentGroupId, this.dbListener)
            this.setState({messages: [], loading: true});
            this.dbListener = this.listenToMessagesData(nextProps.currentGroupId)
        }
    }

    scrollToBottom = () => {
        const element = ReactDOM.findDOMNode(this.bottomMostNodeToScrollInto)
        element.scrollIntoView()
    };

    listenToMessagesData = (currentGroupId) => {
        return DBFirebase.onMessagesDataChange(currentGroupId, newMessages => {
            this.setState({messages: newMessages ? newMessages : [], loading: false})
        })
    };

    renderMessages = (message) => {
        switch (message.type) {
            case DBFirebase.messageTypes.TEXT:
            case DBFirebase.messageTypes.FILE:
                const {currentUser} = this.props;
                const isOwned = currentUser && message.from.id === currentUser.id
                return <Message
                    key={message.id}
                    message={message}
                    isOwned={isOwned}
                />;
            default:
                return <div key={message.id}/>
        }
    };

    render() {
        const state = this.state;

        return (
            <div className="message-area-container">
                <Spin spinning={state.loading}>
                    {!state.loading ?
                        <p className="noMessageNotif">Hãy là người đầu tiên bắt đầu cuộc trò chuyện.</p> : ""}
                    {this.state.messages.map(this.renderMessages)}
                    <div ref={node => this.bottomMostNodeToScrollInto = node}/>
                </Spin>
            </div>
        );
    }
}

export default MessagesArea;