import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="notfound-container">
    <h2>404 - Page Not Found</h2>
    <p>The page you are looking for does not exist.</p>
    <Link to="/login">Go to Login</Link>
  </div>
);

export default NotFound; 