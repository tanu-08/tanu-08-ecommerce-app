// ProductDetails.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetails.css";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../actions/ProductActions";

const ProductDetails = ({updateCartCount}) => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState([]);
  
    useEffect(() => {
      const fetchProductDetails = async () => {
        try {
          const response = await fetch(`http://localhost:3001/products/${productId}`);
          if (!response.ok) {
            throw new Error("Product not found");
          }
          const data = await response.json();
          setProduct(data);
        } catch (error) {
          console.error("Error fetching product details:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchProductDetails();
    }, []);

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
  
    const handleBack = () => {
      navigate(-1);
    };
  
    const handleToggleCart = async () => {
      try {
        if (product && cartItems.some((item) => item.product.id === product.id) ) {
          for (let i = 0; i < cartItems.length; i++) {
            if (cartItems[i].product.id === product.id) {
              console.log(cartItems[i].id)
              await fetch(`http://localhost:3001/cart/${cartItems[i].id}`, {
                method: "DELETE",
              });
              break;
            }
          }
          dispatch(removeFromCart(product.id));
          setCartItems(cartItems.filter((item) => item.product.id !== product.id));
          updateCartCount()
        } else if (product) {
          const newItemId = uuidv4();
        await fetch(`http://localhost:3001/cart`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ product,id: newItemId }),
          });
          dispatch(addToCart(product.id));
          cartItems.push({"product":product,"id":newItemId})
          setCartItems([...cartItems, {"product":product,"id":newItemId}]);
          updateCartCount()
        }
      } catch (error) {
        console.error("Error updating cart:", error);
      }
    };
  
    if (loading || product === null) {
      return <p>Loading...</p>;
    }
  
    return (
      <div className="product-details">
        <h2>{product.name}</h2>
        <img src={product.image} alt={product.name} />
        <p>{product.description}</p>
        <p>Price: ${product.price.toFixed(2)}</p>
        <p>Rating: {product.rating}</p>
        <button onClick={handleToggleCart}>
          {cartItems.some((item) => item.product.id === product.id) ? "Remove from Cart" : "Add to Cart"}
        </button>
        <button onClick={handleBack}>Back to Home</button>
      </div>
    );
  };
  
  export default ProductDetails;