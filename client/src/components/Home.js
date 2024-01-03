import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to the Blue IOT Dashboard</h1>
      <Link to="/login" className="home-link">Login</Link>
      <Link to="/register" className="home-link">Register</Link>
    </div>
  );
}

export default Home;
