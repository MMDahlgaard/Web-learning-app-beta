import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';  // Correct import for the CSS file

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="text-2xl font-bold">FlashLearn</Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
