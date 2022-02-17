import React from 'react';
import { Route, Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
    const authData = JSON.parse(sessionStorage.getItem('auth'));

    return authData?.isAuthenticated ? children : <Navigate to='/login' />;
}