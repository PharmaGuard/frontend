import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ account }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">PharmaGuard</div>
      <ul className="navbar-nav">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/drugs">Drugs</Link></li>
        <li><Link to="/orders">Orders</Link></li>
        <li><Link to="/tracking">Tracking</Link></li>
      </ul>
      <div className="navbar-wallet">
        {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : 'Not connected'}
      </div>
    </nav>
  );
}

export default Navbar;