import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Home from './Home/Home';
import Login from './Auth/Login';
import Logout from './Auth/Logout';
import Accounts from './Accounts/Accounts';
import AccountData from './Accounts/AccountData';
import Concepts from './Concepts/Concepts';
import ConceptData from './Concepts/ConceptData';
import './common/styles.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path='/login' element={<Login />} />


        {/* Private routes */}
        <Route path='/' element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        
        <Route path='/home' element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        
        <Route path='/logout' element={
          <PrivateRoute>
            <Logout />
          </PrivateRoute>
        } />

        <Route path='/accounts' element={
          <PrivateRoute>
            <Accounts />
          </PrivateRoute>
        } />

        <Route path='/account' element={
          <PrivateRoute>
            <AccountData />
          </PrivateRoute>
        } />

        <Route path='/concepts' element={
          <PrivateRoute>
            <Concepts />
          </PrivateRoute>
        } />

        <Route path='/concept/:id' element={
          <PrivateRoute>
            <ConceptData />
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
