// ProductDetails.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../actions/ProductActions";

// ... (other imports remain the same)

const ProductDetails = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
  
    // Fetch cart items from Redux state
    // Provide a default empty array as the initial state
    const cartItems = useSelector((state) => state.cart || []);
  
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
    }, [productId]);
  
    useEffect(() => {
      // Check if the product is in the cart and update the 'inCart' property
      if (product) {
        setProduct((prevProduct) => ({
          ...prevProduct,
          inCart: cartItems.some((item) => item.id === prevProduct.id),
        }));
      }
    }, [cartItems, product]);
  
    const handleBack = () => {
      navigate(-1);
    };
  
    const handleToggleCart = async () => {
        try {
          if (product && product.inCart) {
            // Remove from cart API call
            await fetch(`http://localhost:3001/cart/${productId}`, {
              method: "DELETE",
            });
            dispatch(removeFromCart(product.id));
          } else if (product) {
            // Add to cart API call with the entire product object
            await fetch(`http://localhost:3001/cart`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ product }),
            });
            dispatch(addToCart(product.id));
          }
        } catch (error) {
          console.error("Error updating cart:", error);
        }
      };
      
      
  
    // Conditional rendering to check if product is null
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
          {product.inCart ? "Remove from Cart" : "Add to Cart"}
        </button>
        <button onClick={handleBack}>Back to Home</button>
      </div>
    );
  };
  
  export default ProductDetails;
  