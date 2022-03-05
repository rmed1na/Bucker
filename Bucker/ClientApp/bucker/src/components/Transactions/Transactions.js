import './Transactions.css';
import React from 'react';
import Navbar from '../Navbar';
import Calendar from './Calendar';

export default function Transactions() {
    return (
        <div>
            <Navbar hasLogout={true} />
            <div className='component transactions'>
                <div className='header'>
                    <h1>Transactions</h1>
                    <hr />
                </div>
                <div className='content'>
                    <Calendar />
                </div>
            </div>
        </div>
    )
}