import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AlertCreation from './components/AlertCreation';
import './App.css';

function App() {
  const [token, setToken] = useState('');
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login authenticatedUser={authenticatedUser} setAuthenticatedUser={setAuthenticatedUser} setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard authenticatedUser={authenticatedUser} setAuthenticatedUser={setAuthenticatedUser} token={token} />} />
        <Route path="/create-alert" element={<AlertCreation token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;
