import React, {Component} from 'react';
import {Row, Col, Input, Icon, Button} from 'antd';
import './Login.css';
import WithLayout from '../../components/WithLayout'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: ''
        };
    }

    onChangeUserName = (e) => {
        this.setState({userName: e.target.value});
    };

    onChangePassword = (e) => {
        console.log(e);
        this.setState({password: e.target.value});
    };

    render() {
        const {userName, password} = this.state;

        return (
            <div className="login">
                <Row className="row-input" gutter={16}>
                    <Col className="gutter-row" span={4}>
                        <div className="gutter-box title-input">
                            Username:
                        </div>
                    </Col>
                    <Col span={20}>
                        <Input
                            className="gutter-box"
                            placeholder="Enter your username"
                            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            value={userName}
                            onChange={this.onChangeUserName}
                            ref={node => this.userNameInput = node}
                        />
                    </Col>
                </Row>
                <Row className="row-input" gutter={16}>
                    <Col className="gutter-row" span={4}>
                        <div className="gutter-box title-input">
                            Password:
                        </div>
                    </Col>
                    <Col span={20}>
                        <Input
                            className="gutter-box"
                            type="password"
                            placeholder="Enter your password"
                            prefix={<Icon type="code" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            value={password}
                            onChange={this.onChangePassword}
                            ref={node => this.userNameInput = node}
                        />
                    </Col>
                </Row>
                <Row className="row-input" gutter={16}>
                    <Col className="gutter-row" span={4}/>
                    <Col span={20}>
                        <Button type="primary" >Sign In</Button>
                        <span> Don't have a account yet? <a href="/register">Sign Up</a></span>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default WithLayout(Login);
