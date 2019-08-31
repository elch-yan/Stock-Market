import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <div className="ui vertical menu">
            <div className="item">
                <Link to="/sign-up" className="item">Sign Up</Link>
                <Link to="/login" className="item">Login</Link>
                <Link to="/products" className="item">Products</Link>
            </div>
        </div>
    );
}

export default Menu;