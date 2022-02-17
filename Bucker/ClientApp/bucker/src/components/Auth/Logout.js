import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import './Logout.css';
import buckerLogo from '../../images/bucker-white-logo.svg';

const AUTH_DATA = 'auth';
const USER_DATA = 'user';

function getAuthData() {
    return JSON.parse(sessionStorage.getItem(AUTH_DATA));
}

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        var authData = getAuthData();

        if (authData) {
            sessionStorage.clear();
        } else {
            navigate('/login');
        }
    }, []);

    return (
        <div className='logout'>
            <Navbar 
            hasLogout={false}
            hasLogin={true} />
            
            <div className='text'>
                <img src={buckerLogo}/>
                <hr />
                <h2>You have successfully logged out of the application</h2>
                <h3>Hope we see you again soon!</h3>

                <p>Need to go back? You can always <a id='sign_in' href='/login'>sign back in</a></p>

                <hr />
            </div>
        </div>
    )
}