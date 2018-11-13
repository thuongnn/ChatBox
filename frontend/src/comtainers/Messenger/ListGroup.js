import React, {Component} from 'react';
import {Radio, Icon, Modal, Input, Select, message} from 'antd';
import {getListUsers, getListGroups} from '../../modules/User';
import {createGroup} from '../../modules/Group';

import './ListGroup.css';

const Option = Select.Option;

class ListGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listGroups: [],
            listUsers: [],
            selectedUser: [],
            name: '',
            modalVisible: false
        }
    }

    componentDidMount() {
        getListUsers()
            .then(data => this.setState({listUsers: Object.values(data.data)}));

        getListGroups(this.props.session.user.id)
            .then(data => {
                let groups = data.data[0].groups;
                if (groups.length > 0) this.props.setCurrentGroupId(groups[0]._id);
                this.setState({listGroups: data.data[0].groups})
            });
    }

    setModalVisible = (modalVisible) => this.setState({modalVisible});
    onSelectedUser = (selectedUser) => this.setState({selectedUser});
    onChangeName = (e) => this.setState({name: e.target.value});

    onClickNewMessage = (value) => {
        if (value !== "new_message") this.props.setCurrentGroupId(value);
        else this.setModalVisible(true)
    };

    onClickCreateGroup = () => {
        const {name, selectedUser} = this.state;

        if (name !== "" || selectedUser.length > 1) {
            let data = {};
            data["name"] = name;

            selectedUser.push(this.props.session.user.id);
            data["members"] = selectedUser;

            createGroup(data)
                .then(data => {
                    let listGroups = this.state.listGroups;
                    listGroups.push(data.data);
                    this.setState({
                        listGroups,
                        selectedUser: [],
                        name: ''
                    }, () => {
                        message.success("Create a new message successfully !");
                        this.props.setCurrentGroupId(data.data._id);
                        this.setModalVisible(false);
                    });
                })
        } else {
            message.error("Create a new message failed ! Name or member not null");
        }


    };

    render() {
        const state = this.state;
        const props = this.props;

        const listOption = state.listUsers
            .filter(user => user._id !== props.session.user.id)
            .map((user, index) => <Option key={index} value={user._id}>{user.username}</Option>);
        const listGroup = state.listGroups.map((group, index) => {
            return (<Radio.Button key={index} value={group._id}>{group.name}</Radio.Button>)
        });

        return (
            <div className="radio-group">
                <Radio.Group
                    onChange={(e) => this.onClickNewMessage(e.target.value)}
                    value={props.currentGroupId}
                    buttonStyle="solid">
                    {listGroup}
                    <Radio.Button
                        value="new_message"
                        style={{textAlign: 'center', borderBottom: '1px solid #d9d9d9'}}>
                        <Icon type="plus-circle"/>
                    </Radio.Button>
                </Radio.Group>
                <Modal
                    title="A new message"
                    centered
                    visible={this.state.modalVisible}
                    onOk={() => this.onClickCreateGroup()}
                    onCancel={() => this.setModalVisible(false)}>
                    <div className="modal-new-message">
                        <Input placeholder="Name" onChange={this.onChangeName} value={state.name}/>
                        <Select
                            mode="multiple"
                            style={{width: '100%'}}
                            showSearch
                            value={state.selectedUser}
                            placeholder="Please select user"
                            onChange={this.onSelectedUser}>
                            {listOption}
                        </Select>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default ListGroup;