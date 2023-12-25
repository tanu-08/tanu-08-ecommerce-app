import React, { useState, useEffect } from "react";
import "../cart/Cart.css";
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch("http://localhost:3001/cart");
        if (!response.ok) {
          throw new Error("Error fetching cart items");
        }
        const data = await response.json();
        setCartItems(data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchCartItems();
  }, []);

  return (
    <div className="cart">
      <h1>Your Cart</h1>
      <div className="cart-items">
        {cartItems.map((cartItem) => (
          <div className="cart-card" key={cartItem.id}>
             <div className="cart-image">
        <img src={cartItem.product.image} alt={cartItem.product.name} />
      </div>
            <p className="cart-name">{cartItem.product.name}</p>
            <p className="cart-des">{cartItem.product.description}</p>
            <p className="cart-price">${cartItem.product.price.toFixed(2)}</p>
            <p className="cart-rating">Rating: {cartItem.product.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
