import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import axios from '../hoc/axios';

import assert from 'assert';

export default function withAuth(ComponentToProtect) {
    return () => {
        const [ loading = false, setLoading ] = useState();
        const [ redirect = false, setRedirect ] = useState();

        useEffect(() => {
            const checkToken = async () => {
                try {
                    const { data } = await axios.get('/authentication/checkToken');
                    assert(data && data.status === 'success', data ? data.message : 'Authorization error');

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
                { loading ? <div>{loading}</div> : 
                    redirect ? <Redirect to="/login" /> :
                    <React.Fragment>
                        <ComponentToProtect />
                    </React.Fragment>
                }
            </div>
        );
    }
}
