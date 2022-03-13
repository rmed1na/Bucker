import './Transactions.css';
import React from 'react';
import Navbar from '../Navbar';
import Calendar from './Calendar';
import CreateModal from './TransactionCreateModal';
import Icons from '../common/Icons';

export default function Transactions() {

    function onAddNewTransactionClick() {
        return <div>Hello world</div>
    }

    return (
        <div>
            <Navbar hasLogout={true} />

            <CreateModal isVisible={true}/>
            <div className='component transactions'>
                <div className='header'>
                    <h1>Transactions</h1>
                    <button className='button grey add-btn' onClick={() => onAddNewTransactionClick()}>
                        <img src={Icons.addWhite}/>
                        <span>Add</span>
                    </button>
                </div>
                <hr />
                <div className='content'>
                    <div className='calendar'>
                        <Calendar />
                    </div>
                    <div className='items'>
                        <div className='row header'>
                            <h4>Account</h4>
                            <h4>Concept</h4>
                            <h4>Description</h4>
                            <h4>Amount</h4>
                        </div>
                        <div className='row transaction'>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}