import React, { useState, useEffect } from 'react';
import Fetcher from '../Utilities/Fetcher';
import StorageHelper from '../Utilities/StorageHelper';
import Loader from '../common/Loader';
import Icons from '../common/Icons';
import './TransactionCreateModal.css';

export default function TransactionCreateModal(props) {
    const displayStyle = props && props.isVisible == true ? '' : 'none';
    const [accounts, setAccounts] = useState([]);
    const [visibleAccounts, setVisibleAccounts] = useState([]);
    const [userData] = useState(StorageHelper.getUserData());
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        Fetcher.call('GET', `account/user/${userData.email}`)
            .then(data => {
                setAccounts(data);
                setVisibleAccounts(data);
                setIsLoading(false);
            });
    }, []);

    function getAccountsList(accounts) {
        return accounts.map(account => {
            return <div key={account.accountId.toString()} className=''>
                <h4>{account.name}</h4>
                <p>{account.description}</p>
            </div>;
        })
    }

    function handleSearchTextChange(text) {
        
    }

    return (
        <div>
            <Loader isLoading={isLoading} text='Loading...'/>
            <div className='modal newTransaction' style={{ display: displayStyle }}>
                <div className='content'>
                    <div className='header'>
                        <h2>New transaction</h2>
                        <h4>Select an account</h4>
                    </div>
                    <hr />
                    <div className='search-bar'>
                        <img src={Icons.searchWhite}/>
                        <input 
                            type='text' 
                            className='textbox' 
                            placeholder='Search an account by name' 
                            onChange={(e) => handleSearchTextChange(e.target.value)} 
                        />
                    </div>
                    <div className=''>
                        {getAccountsList(visibleAccounts)}
                    </div>
                </div>
            </div>
        </div>
    );
}