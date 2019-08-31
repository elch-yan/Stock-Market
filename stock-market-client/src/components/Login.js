// Login.jsx
import React from 'react';
import axios from '../hoc/axios';

import assert from 'assert';

const LoginComponent = () => {
    let emailInput = null;
    let passwordInput = null;

    const onSubmit = async (event) => {
        try {
            event.preventDefault();
            const email = emailInput.value;
            const password = passwordInput.value;

            const { data } = await axios.post('users/authenticate', {
                email,
                password
            });
            console.log(data);
            assert(data && data.status === 'success', data ? data.message : 'Data not fetched from server');


        } catch (err) {
            alert(`Error logging in please try again, reason: ${err.message}`);
        }
    }

    return (
        <form className="ui form" onSubmit={onSubmit}>
            <div className="field">
                <label>Email</label>
                <input type="text" name="first-name" ref={i => emailInput = i} placeholder="example@mail.com"/>
            </div>
            <div className="field">
                <label>Password</label>
                <input type="password" ref={i => passwordInput = i} placeholder="password"/>
            </div>
            <button className="ui button" type="submit">Log in</button>
        </form>
    );
}

export default LoginComponent;