import React, {Component} from 'react';
import {Row, Col, Input, Button, message} from 'antd';
import {login} from '../../modules/User';
import LocalStorage from '../../utils/LocalStorage';
import './Login.css';
import WithLayout from '../../components/WithLayout'
import history from "../../utils/History";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: {
                username: '',
                password: ''
            },
            messageError: {},
            isLoading: false
        };
    }

    isValid = () => {
        let inputs = this.state.inputs;
        let messageError = this.state.messageError;
        let count = 0;

        if (!inputs.username) {
            messageError.username = "You can't leave this empty.";
            count++;
        }

        if (!inputs.password) {
            messageError.password = "You can't leave this empty.";
            count++;
        }

        if (count !== 0) {
            this.setState({messageError});
            return false;
        }
        else return true;
    };

    onBlur = (name, value) => {
        let messageError = this.state.messageError;
        switch (name) {
            case 'username':
                if (!value) {
                    messageError[name] = "You can't leave this empty.";
                }
                break;
            case 'password':
                if (!value) {
                    messageError[name] = "You can't leave this empty.";
                }
                break;
            default:
                break;
        }
        this.setState({
            messageError
        })
    };

    onFocus = (name) => {
        let messageError = this.state.messageError;
        delete messageError[name];
        this.setState({
            messageError: messageError
        })
    };

    onChangeInput = (name, value) => {
        let state = this.state.inputs;
        state[name] = value;
        this.setState({state})
    };

    onSubmit = () => {
        if (this.isValid()) {
            let data = {
                username: this.state.inputs.username,
                password: this.state.inputs.password,
            };

            this.setState({isLoading: true});

            login(data).then(res => {
                if (res.data.err) message.error(res.data.err);
                else {
                    LocalStorage.set("session", res.data);
                    message.success("Login successfully !");
                    history.push('/');
                }
                this.setState({isLoading: false});
            }).catch(err => {
                console.log(err);
                message.error("Login error !");
                this.setState({isLoading: false});
            });
        }
    };

    render() {
        const inputs = this.state.inputs;

        return (
            <div className="login">
                <Row className="row-input" gutter={16}>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box title-input">
                            Username:
                        </div>
                    </Col>
                    <Col span={18}>
                        <Input
                            className="gutter-box"
                            placeholder="Enter your username"
                            value={inputs.username}
                            onChange={(e) => this.onChangeInput('username', e.target.value)}
                            onBlur={(e) => this.onBlur('username', e.target.value)}
                            onFocus={() => this.onFocus('username')}
                        />
                        <label className='register-error'>{this.state.messageError.username}</label>
                    </Col>
                </Row>
                <Row className="row-input" gutter={16}>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box title-input">
                            Password:
                        </div>
                    </Col>
                    <Col span={18}>
                        <Input
                            className="gutter-box"
                            type="password"
                            placeholder="Enter your password"
                            value={inputs.password}
                            onChange={(e) => this.onChangeInput('password', e.target.value)}
                            onBlur={(e) => this.onBlur('password', e.target.value)}
                            onFocus={() => this.onFocus('password')}
                        />
                        <label className='register-error'>{this.state.messageError.password}</label>
                    </Col>
                </Row>
                <Row className="row-input" gutter={16}>
                    <Col className="gutter-row" span={6}/>
                    <Col span={18}>
                        <Button type="primary" loading={this.state.isLoading} onClick={this.onSubmit}>Sign In</Button>
                        <span> Don't have a account yet? <a href="/register">Sign Up</a></span>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default WithLayout(Login);
