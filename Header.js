import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{
      backgroundColor: '#2c3e50',
      color: 'white',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
        <h2>E-Commerce</h2>
      </Link>
      <nav>
        <Link to="/" style={{ color: 'white', margin: '0 1rem' }}>Home</Link>
        <Link to="/products" style={{ color: 'white', margin: '0 1rem' }}>Products</Link>
        <Link to="/cart" style={{ color: 'white', margin: '0 1rem' }}>Cart</Link>
        <Link to="/login" style={{ color: 'white', margin: '0 1rem' }}>Login</Link>
      </nav>
    </header>
  );
};

export default Header;