import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import './Main.css';

import Login from '../comtainers/user/Login';
import Register from '../comtainers/user/Register';
import App from '../comtainers/Messenger/App';

class Main extends Component {
    render() {
        return (
            <div className="main">
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/login' component={Login}/>
                        <Route exact path='/register' component={Register}/>
                        <Route exact path='/chatbox' component={App}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default Main;
