import React, { useState, useEffect } from 'react';
import axios from '../hoc/axios';
import { AssertionError } from 'assert';

import assert from 'assert';

const Stocks = () => {
    const [ stocks, setStocks ] = useState();

    useEffect(() => {
        const getStocks = async () => {
            try {
                const { data } = await axios.get('stocks');
                assert(data && data.status === 'success', data ? data.message : 'Error while fetching stocks');
                
                setStocks(data.stocks);
            } catch (err) {
                alert(err.message);
            }
        };

        getStocks();
    }, []);

    return (
        <div>
            { stocks ? 
                <div className="ui segments">
                <div className="ui segment">
                    <h3 className="ui header">Stocks</h3>
                </div>
                <div className="ui segment">
                    <table class="ui small fixed compact table">
                        <thead>
                            <tr>
                                <th>Stock Name</th>
                                <th>Price</th>
                                <th>Currency</th>
                                <th>Owner</th>
                                <th>On Sell</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stocks.map(({ name, price, owner, onSell, description }) => (
                                <tr>
                                <td data-label="Stock Name">{name}</td>
                                <td data-label="Price">{price.amount}</td>
                                <td data-label="Currency">{price.currency}</td>
                                <td data-label="Owner">{owner}</td>
                                <td data-label="On Sell">{onSell ? 'Yes' : 'No'}</td>
                                <td data-label="Description">{description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div> : <p>Loading...</p>
            }
        </div>
    );
};

export default Stocks;