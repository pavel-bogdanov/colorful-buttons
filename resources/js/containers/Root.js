import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Logout from './Auth/Logout';
import Buttons from './Buttons';
import Link from './Link/Link';
import ModifyLink from './Link/ModifyLink';
import NotFound from '../components/NotFound';

class Root extends Component {
    render() {

        return (
            <BrowserRouter>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
                <Switch>
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                    <Route path='/logout' component={Logout} />
                    <Route path='/buttons' component={Buttons} />
                    <Route path='/link/modify/:position' component={ModifyLink} />
                    <Route path='/link' component={Link} />
                    <Route path='/' exact component={Home} />
                    <Route path="*" component={NotFound} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Root;

if (document.getElementById('root')) {
    ReactDOM.render(<Root />, document.getElementById('root'));
}