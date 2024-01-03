import React, { useState } from 'react';
import './Register.css';

const AVAILABLE_SCOPES = [
  'dashboard',
  'alerts:list',
  'alerts:manage',
  'access-control:list',
  'access-control:manage',
];

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    companyId: '',
    scopes: ['dashboard']
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.status === 201) {
        console.log('Registration successful:', data);
        // Handle successful registration here (e.g., redirecting to login page)
      } else {
        console.log('Registration failed:', data);
        // Handle registration errors here (e.g., showing error message to the user)
      }
    } catch (error) {
      console.error('Registration error:', error);
      // Handle network errors here
    }
  };


  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register</h2>
        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
        <select onChange={handleChange} name="companyId">
          {Array.from({ length: 10 }).map((_, index) => {
            const key = `C${index+1}`;
            const value = `Company ${index+1}`;
            return <option value={key} key={key}>{value}</option>
          })}
        </select>
        {AVAILABLE_SCOPES.map((scope) => {
          return <div style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
            <label for={scope}>{scope}</label>
            <input id={scope} type="checkbox" checked={formData.scopes.includes(scope)} onChange={(event) => {
              const scopes = new Set(formData.scopes);
              if (event.target.checked) {
                scopes.add(scope);
              } else {
                scopes.delete(scope);
              }
              console.log(scopes);
              setFormData({
                ...formData,
                scopes: Array.from(scopes)
              });
            }} />
          </div>
        })}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
