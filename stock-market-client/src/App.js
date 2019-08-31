import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Menu from './components/Menu';
import withAuth from './components/WithAuth';

import SignUp from './components/SignUp';
import Login from './components/Login';
import Products from './components/Products';

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
                        <Route path="/products" component={withAuth(Products)} />
                    </div>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
