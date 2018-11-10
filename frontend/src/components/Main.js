import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import {Router} from 'react-router';
import History from '../utils/History';
import './Main.css';

import Login from '../comtainers/user/Login';
import Register from '../comtainers/user/Register';
import App from '../comtainers/Messenger/App';

class Main extends Component {
    render() {
        return (
            <div className="main">
                <Router history={History}>
                    <Switch>
                        <Route exact path='/' component={App}/>
                        <Route exact path='/login' component={Login}/>
                        <Route exact path='/register' component={Register}/>
                        <Route exact path='/chatbox' component={App}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default Main;
