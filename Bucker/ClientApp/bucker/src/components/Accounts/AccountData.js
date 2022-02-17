import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import Fetcher from '../Utilities/Fetcher';
import Loader from '../common/Loader';
import './Account.css';

export default function Account() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [accountData, setAccountData] = useState(() => getAccountDataFromLocation());
    const [authData, setAuthData] = useState(() => getAuthData());
    const [isCreateView, setIsCreateView] = useState(() => accountData.id === 0);
    const [isUpdateView, setIsUpdateView] = useState(() => accountData.id > 0);
    
    function getAccountDataFromLocation() {
        if (location.state?.account) {
            let account = location.state.account;
            return {
                id: account.id,
                name: account.name,
                description: account.description,
                creationDate: account.creationDate,
                updatedDate: account.updatedDate
            }
        }

        return {
            id: 0,
            name: '',
            description: '',
            creationDate: '',
            updatedDate: ''
        }
    }
    
    function updateAccountData() {
        Fetcher.call('PUT', 'account/update', {
            id: accountData.id,
            name: accountData.name,
            description: accountData.description
        }).then(data => {
            setAccountData({
                ...accountData,
                name: data.name,
                description: data.description,
                updatedDate: data.updatedDate
            })
        });
    }

    function createNewAccount() { 
        Fetcher.call('POST', 'account/add', {
            ownerEmail: authData.email,
            name: accountData.name,
            description: accountData.description
        }).then(data => {
            setAccountData({
                id: data.accountId,
                name: data.name,
                description: data.description,
                creationDate: data.createdDate,
                updatedDate: data.updatedDate
            });
            setIsCreateView(false);
            setIsUpdateView(true);
        });
    }

    const handleNameChange = (name) => setAccountData({...accountData, name});
    const handleDescriptionChange = (description) => setAccountData({...accountData, description});

    return (
        <div>
            <Loader isLoading={isLoading} />
            <Navbar hasLogout={true} />

            <div className='account'>
                <div className='header'>
                    <h1>{isCreateView ? 'New' : accountData.name} account details</h1>
                    <hr className='margin-top margin-bottom' />
                </div>
                <div className='data'>
                    <div className='read'>
                        <h4>Identifier:&nbsp;<label className='readonlyData'>{accountData.id}</label></h4>
                        <h4>Creation date:&nbsp;<label className='readonlyData'>{accountData.creationDate}</label></h4>
                        <h4>Last update:&nbsp;<label className='readonlyData'>{accountData.updatedDate}</label></h4>
                    </div>
                    <div className='write'>
                        <div className='section'>
                            <h4 className='title'>Name</h4>
                            <input
                                id='name'
                                className='textbox'
                                type='text'
                                value={accountData.name}
                                onChange={e => handleNameChange(e.target.value)}
                                required></input>
                        </div>
                        <div className='section'>
                            <h4 className='title'>Description</h4>
                            <input
                                id='description'
                                className='textbox'
                                type='text'
                                value={accountData.description}
                                onChange={e => handleDescriptionChange(e.target.value)}></input>
                        </div>
                        <div className='section actions'>
                            {isCreateView && <button id='createBtn' className='button yellow' onClick={createNewAccount}>Create account</button>}
                            {isUpdateView && <button id='saveBtn' className='button green' onClick={updateAccountData}>Update account details</button>}
                            <button id='cancelBtn' className='button red' onClick={() => navigate('/accounts')}>Go back</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function getAuthData() {
    return JSON.parse(sessionStorage.getItem('auth'));
}