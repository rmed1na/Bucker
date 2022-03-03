import './Home.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import StorageHelper from '../Utilities/StorageHelper';
import Fetcher from '../Utilities/Fetcher';
import transactionsLogo from '../../images/transactions.png';
import accountLogo from '../../images/account.png';
import userLogo from '../../images/user.png';
import conceptLogo from '../../images/concept.png';

function Home() {
    const [authData, setAuthData] = useState(() => StorageHelper.getAuthData());
    const [userData, setUserData] = useState(() => StorageHelper.getUserData());
    const [welcomeMessage, setWelcomeMessage] = useState('Welcome');
    const navigate = useNavigate();

    useEffect(() => {
        if (authData && authData.token) {
            Fetcher.call('GET', `user/details/email/${authData.email}`).then(data => {
                handleUserData(data);
            }).catch(ex => {
                navigate('/login');
            });
        } else {
            navigate('/login');
        }
    }, []);

    function handleUserData(data) {
        StorageHelper.setUserData(data);

        setUserData(data);
        setWelcomeMessage(`Welcome, ${data.username}`);
    }

    return (
        <div className='home'>
            <Navbar 
            hasLogout={true}
            hasLogin={false}/>
            <div className='welcome'>
                <h2>{welcomeMessage}</h2>
            </div>
            <div className='menu'>
                <div className='item'>
                    <a href='/transactions'>
                        <div className='item-icon'>
                            <img src={transactionsLogo}/>
                        </div>
                        <div className='item-text'>
                            <h3>Transactions</h3>
                        </div>
                    </a>
                </div>

                <div className='item'>
                    <a href='/accounts'>
                        <div className='item-icon'>
                            <img src={accountLogo} />
                        </div>
                        <div className='item-text'>
                            <h3>Accounts</h3>
                        </div>
                    </a>
                </div>

                <div className='item'>
                    <a href='/concepts'>
                        <div className='item-icon'>
                            <img src={conceptLogo}/>
                        </div>
                        <div className='item-text'>
                            <h3>Concepts</h3>
                        </div>
                    </a>
                </div>

                <div className='item'>
                    <a href='#'>
                        <div className='item-icon'>
                            <img src={userLogo}/>
                        </div>
                        <div className='item-text'>
                            <h3>Users</h3>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Home;