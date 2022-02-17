import React, { useState } from 'react';
import Loader from '../common/Loader';
import StorageHelper from '../Utilities/StorageHelper';
import Fetcher from '../Utilities/Fetcher';
import { useNavigate } from 'react-router-dom';
import whiteLogo from '../../images/bucker-white-logo.svg';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    function onLoginClick() {
        setIsLoading(true);

        Fetcher.anonymousCall('POST', 'user/authenticate', {
            email: email,
            password: password
        }).then(data => {
            if (data.isAuthenticated) {
                StorageHelper.setAuthData(data);
                setEmail('');
                setPassword('');
                setIsLoading(false);
                navigate('/home');
            } else {
                alert('Invalid user or password. Please try again');
                setIsLoading(false);
            }
        }).catch(ex => {
            alert('Something went wrong. Please try again later');
            console.error(ex);
        });
    }
    
    return (
        <>
            <Loader isLoading={isLoading} text='Signing in...'/>
            <div className='login'>
                <div className='logo'>
                    <img src={whiteLogo} alt='Logo'/>
                </div>
                <hr />
                <div className='form'>
                    <label>Email</label>
                    <input type="email" className='textbox' value={email} onChange={e => setEmail(e.target.value)} required/>
                        
                    <label>Password</label>
                    <input type="password" className='textbox' value={password} onChange={e => setPassword(e.target.value)} required/>

                    <input type='submit' className='button' value='Sign in' onClick={onLoginClick}/>
                    <hr />
                    <a className='styled' href='#'>I forgot my password</a>
                    <label>Don't have an account yet? Let's <a href='#'>sign you up!</a></label>
                </div>
            </div>
        </>
    );
}

export default Login;