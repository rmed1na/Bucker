import './Transactions.css';
import React from 'react';
import Navbar from '../Navbar';

export default function Transactions() {
    return (
        <div>
            <Navbar hasLogout={true} />
            <div className='component transactions'>
                <div className='header'>
                    <h1>Transactions</h1>
                    <hr className='margin-bottom' />
                </div>
            </div>
        </div>
    )
}