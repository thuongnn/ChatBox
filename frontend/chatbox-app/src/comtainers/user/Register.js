import React, {Component} from 'react';
import {Row, Col, Input, Button, message} from 'antd';
import {register} from '../../modules/User'
import './Register.css';
import WithLayout from '../../components/WithLayout';
import history from '../../utils/History'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: {
                username: '',
                password: '',
                email: '',
                password_confirmation: ''
            },
            messageError: {},
            isLoading: false
        };
    }

    onBlur = (name, value) => {
        let messageError = this.state.messageError;
        switch (name) {
            case 'username':
                if (!value) {
                    messageError[name] = "You can't leave this empty.";
                }
                break;
            case 'email':
                if (!value) {
                    messageError.email = "You can't leave this empty.";
                } else if (!this.checkEmail(value)) {
                    messageError[name] = "The email is invalid.";
                }
                break;
            case 'password':
                if (!value) {
                    messageError[name] = "You can't leave this empty.";
                }
                else if (value.length < 6 || value.length > 20) {
                    messageError[name] = "Password must be greater than 6 và less than 20 characters."
                }
                break;
            case 'password_confirmation':
                if (!value || value != this.state.inputs.password) {
                    messageError[name] = "Re-password not match !"
                }
                break;
            default:
                messageError = messageError
        }
        this.setState({
            messageError
        })
    };

    onFocus = (name, value) => {
        let messageError = this.state.messageError;
        delete messageError[name];
        this.setState({
            messageError: messageError
        })
    };

    checkEmail = (value) => {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(value);
    };

    onChangeInput = (name, value) => {
        let state = this.state.inputs;
        state[name] = value;
        this.setState({state})
    };

    onSubmit = () => {
        let data = {
            username: this.state.inputs.username,
            email: this.state.inputs.email,
            password: this.state.inputs.password,
        };

        this.setState({isLoading: true});

        register(data).then(res => {
            console.log(res.data);
            message.success("Register successfully !")
            history.push('/login')
        }).catch(err => {
            console.log(err);
            message.error("Register error !")
        });
    };

    render() {
        const inputs = this.state.inputs;

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
                            type="text"
                            placeholder="Enter your username"
                            value={inputs.username}
                            onChange={(e) => this.onChangeInput('username', e.target.value)}
                            onBlur={(e) => this.onBlur('username', e.target.value)}
                            onFocus={(e) => this.onFocus('username', e.target.value)}
                        />
                        <label className='register-error'>{this.state.messageError.username}</label>
                    </Col>
                </Row>
                <Row className="row-input" gutter={16}>
                    <Col className="gutter-row" span={4}>
                        <div className="gutter-box title-input">
                            Email:
                        </div>
                    </Col>
                    <Col span={20}>
                        <Input
                            className="gutter-box"
                            type="email"
                            placeholder="Enter your email"
                            value={inputs.email}
                            onChange={(e) => this.onChangeInput('email', e.target.value)}
                            onBlur={(e) => this.onBlur('email', e.target.value)}
                            onFocus={(e) => this.onFocus('email', e.target.value)}
                        />
                        <label className='register-error'>{this.state.messageError.email}</label>
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
                            value={inputs.password}
                            onChange={(e) => this.onChangeInput('password', e.target.value)}
                            onBlur={(e) => this.onBlur('password', e.target.value)}
                            onFocus={(e) => this.onFocus('password', e.target.value)}
                        />
                        <label className='register-error'>{this.state.messageError.password}</label>
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
                            placeholder="Enter your re-password"
                            value={inputs.password_confirmation}
                            onChange={(e) => this.onChangeInput('password_confirmation', e.target.value)}
                            onBlur={(e) => this.onBlur('password_confirmation', e.target.value)}
                            onFocus={(e) => this.onFocus('password_confirmation', e.target.value)}
                        />
                        <label className='register-error'>{this.state.messageError.password_confirmation}</label>
                    </Col>
                </Row>
                <Row className="row-input" gutter={16}>
                    <Col className="gutter-row" span={4}/>
                    <Col span={20}>
                        <Button type="primary" onClick={this.onSubmit}>Sign In</Button>
                        <span> Already have an account? <a href="/login">Sign In</a></span>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default WithLayout(Login);
