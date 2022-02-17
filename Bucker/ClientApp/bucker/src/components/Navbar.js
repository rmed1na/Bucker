import React from 'react';
import buckerWhiteLogo from '../images/bucker-white-logo.svg';
import './Navbar.css';

export default function Navbar(props) {
    const logoutLinkStyle = props && props.hasLogout == true ? '' : 'none';
    const loginLinkStyle = props && props.hasLogin == true ? '' : 'none';

    return (
        <div className='navbar'>
            <nav>
                <a href='/home'><img id='nav_icon' src={buckerWhiteLogo} /></a>
                <a id='logout' style={{display: logoutLinkStyle}} href='/logout' className='position-right'>Log out</a>
                <a id='login' style={{display: loginLinkStyle}} href='/login' className='position-right'>Sign in</a>
            </nav>
        </div>
    )
}