import React from 'react';
import Link from 'next/link';

function Navbar({ account }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">PharmaGuard</div>
      <ul className="navbar-nav">
        <li><Link href="/"><a>Home</a></Link></li>
        <li><Link href="/dashboard"><a>Dashboard</a></Link></li>
        <li><Link href="/drugs"><a>Drugs</a></Link></li>
        <li><Link href="/orders"><a>Orders</a></Link></li>
        <li><Link href="/tracking"><a>Tracking</a></Link></li>
      </ul>
      <div className="navbar-wallet">
        {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : 'Not connected'}
      </div>
    </nav>
  );
}

export default Navbar;