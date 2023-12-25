import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import Home from '../home/Home';
import Product from '../products/Product';
import Cart from '../cart/Cart';
import "../navbar/Navbar.css";
import ProductDetails from '../home/ProductDetails';
import { HomeRounded, LocalMallRounded, ShoppingCart } from '@mui/icons-material';

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);

  //fetch cart count
  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const response = await fetch("http://localhost:3001/cart");
        if (!response.ok) {
          throw new Error("Error fetching cart count");
        }
        const data = await response.json();
        setCartCount(data.length);
      } catch (error) {
        console.error("Error fetching cart count:", error);
      }
    };
    fetchCartCount();
  }, []);

  //update cart count
  const updateCartCount = async () => {
    try {
      const response = await fetch("http://localhost:3001/cart");
      if (!response.ok) {
        throw new Error("Error fetching cart count");
      }
      const data = await response.json();
      setCartCount(data.length);
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <span className="navbar-logo">
          Your Ecommerce
        </span>

        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            <HomeRounded color='black'/>
          </Link>
          <Link to="/cart" className="navbar-link">
            <ShoppingCart color='black'/>
            {cartCount > 0 && (
              <span className="cart-count">{cartCount}</span>
            )}
          </Link>
        </div>
      </div>
      <div className="content">
        <Routes>
          <Route path="/" element={<Home  updateCartCount={updateCartCount}/>} />
          <Route path="/product/:productId" element={<ProductDetails  updateCartCount={updateCartCount}/>} />
          <Route path="/products" element={<Product />} />
          <Route path="/cart" element={<Cart updateCartCount={updateCartCount} />} />
        </Routes>
      </div>
    </nav>
  );
};

export default Navbar;
