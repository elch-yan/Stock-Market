import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import axios from '../hoc/axios';

import assert from 'assert';

export default function withAuth(ComponentToProtect) {
    return () => {
        const [ loading = false, setLoading ] = useState();
        const [ redirect = false, setRedirect ] = useState();
console.log('heey')
        useEffect(() => {
            const checkToken = async () => {
                try {
                    const res = await axios.get('/authentication/checkToken');
                    assert(res.status === 200, res.data ? res.data.message : 'Authorization error');

                    setLoading(false);
                    setRedirect(false);
                } catch (err) {
                    setLoading(false);
                    setRedirect(true);
                }
            }

            checkToken();
        }, []);

        return (
            <div>
                { loading ? null : 
                    redirect ? <Redirect to="/login" /> :
                    <React.Fragment>
                        <ComponentToProtect {...this.props} />
                    </React.Fragment>
                }
            </div>
        );
    }
}
