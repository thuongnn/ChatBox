import React, {Component} from 'react';
import {Radio, Badge} from 'antd';
import {getMemberByGroup, userChanged} from '../../modules/DBFirebase';

import './ListMember.css';

class ListMember extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listUser: {}
        }
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
        const {listUser} = this.state;
        const badge = (status, username) => {
            if (status === "online") return <Badge status="success" text={username}/>;
            else if (status === "Away") return <Badge status="warning" text={username}/>;
            else return <Badge status="default" text={username}/>;
        };
        const dataMember = Object.values(listUser).map((user, index) => {
            console.log(user.username);
            return <Radio.Button key={index} value={user.username}>
                {badge(user.status, user.username)}
            </Radio.Button>
        });
        return (
            <div className="list-member">
                <Radio.Group disabled style={{cursor: 'pointer'}}>
                    <Radio.Button style={{background: '#1890ff'}}><b>Members</b></Radio.Button>
                    {dataMember}
                </Radio.Group>
            </div>
        );
    }
}

export default ListMember;