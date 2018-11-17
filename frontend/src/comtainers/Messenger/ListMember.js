import React, {Component} from 'react';
import {Radio, Badge, Tooltip} from 'antd';
import {getMemberByGroup, userChanged} from '../../modules/DBFirebase';
import {lastTimeOnline} from '../../utils/Index';

import './ListMember.css';

class ListMember extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listUser: {},
            currentTime: new Date().getTime()
        }
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                currentTime: new Date().getTime()
            })
        }, 1000)
    }

    componentWillReceiveProps(nextProps) {
        getMemberByGroup(nextProps.currentGroupId, members => {
            members.forEach(userId => {
                this.dataChanged(userId);
            })
        });
    }

    dataChanged = (userId) => {
        const {listUser} = this.state;
        userChanged(userId, user => {
            listUser[userId] = user;
            this.setState({listUser})
        })
    };

    render() {
        const {listUser, currentTime} = this.state;
        const badge = (status, username) => {
            if (status === "online") return <Badge status="success" text={username}/>;
            else if (status === "Away") return <Badge status="warning" text={username}/>;
            else return <Badge status="default" text={username}/>;
        };
        const dataMember = Object.values(listUser).map((user, index) => {
            return <Radio.Button key={index} value={user.username}>
                <Tooltip title={lastTimeOnline(currentTime, user.last_time)}>{badge(user.status, user.username)}</Tooltip>
            </Radio.Button>
        });
        return (
            <div className="list-member">
                <Radio.Group>
                    <Radio.Button><b>Members</b></Radio.Button>
                    {dataMember}
                </Radio.Group>
            </div>
        );
    }
}

export default ListMember;