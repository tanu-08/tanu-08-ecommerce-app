import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Home from '../home/Home';
import Product from '../products/Product';
import Cart from '../cart/Cart';
import "../navbar/Navbar.css";
import { HomeRounded,LocalMallRounded,ShoppingCart } from '@mui/icons-material';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <span className="navbar-logo">
          Your Ecommerce
        </span>

        <div className="navbar-links">
          <Link to="/" className="navbar-link">
          <HomeRounded color='white'/>
          </Link>
          <Link to="/products" className="navbar-link">
          <LocalMallRounded color='white'/>
          </Link>
          <Link to="/cart" className="navbar-link">
          <ShoppingCart color='white'/>
          </Link>
        </div>
      </div>
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </nav>
  );
};

export default Navbar;