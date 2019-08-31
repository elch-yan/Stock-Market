import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Menu from './components/Menu';
import withAuth from './components/WithAuth';

import SignUp from './components/SignUp';
import Login from './components/Login';
import Stocks from './components/Stocks';

const App = () => {
    return (
        <div className="ui container">
            <BrowserRouter>
                <div className="ui two column grid">
                    <div className="four wide column">
                        <Menu />
                    </div>
                    <div className="twelve wide column">
                        <div className="ui massive message">
                            Welcome to Stock Market!
                        </div>
                        <Route path="/sign-up" component={SignUp} />
                        <Route path="/login" component={Login} />
                        <Route path="/stocks" component={withAuth(Stocks)} />
                    </div>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
