// ProductCard.js
import React, { useState } from "react";
import "./ProductCard.css";
import { useDispatch } from "react-redux";
import { editProduct } from "../../actions/ProductActions";
import { Link } from "react-router-dom";

const ProductCard = ({ product, onDelete,onEditSuccess, onEditError , onAddCart , cartItems}) => {
  const dispatch = useDispatch();

  const { id, name, description, price, rating, image } = product;

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedPrice, setEditedPrice] = useState(price);
  const [editedRating, setEditedRating] = useState(rating);

  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleAddCartClick = () => {
    onAddCart(product);
  };

  const handleSave = async () => {
    const updatedProduct = {
      name: editedName,
      description: editedDescription,
      price: editedPrice,
      rating: editedRating,
      image: image,
    };
    try {
      const response = await fetch(
        `http://localhost:3001/products/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      dispatch(editProduct(id, updatedProduct));
      setIsEditing(false);
      // setNotification({ type: 'success', message: 'Product updated successfully!' });
      onEditSuccess(); // Notify the parent about success
    } catch (error) {
      console.error("Error updating product:", error);
      onEditError(); // Notify the parent about the error
    }
  };

  const handleCancel = () => {
    // Cancel editing and revert to original values
    setEditedName(name);
    setEditedDescription(description);
    setEditedPrice(price);
    setEditedRating(rating);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${id}`} className="product-link">
      <div className="product-image">
        <img src={image} alt={name} />
      </div>
      </Link>
      {isEditing ? (
        <>
         
            <p className="product-name">{name}</p>
          
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <input
            type="number"
            value={editedPrice}
            onChange={(e) => setEditedPrice(e.target.value)}
          />
          <input
            type="number"
            value={editedRating}
            onChange={(e) => setEditedRating(e.target.value)}
          />
        </>
      ) : (
        <>
          <p className="product-name">{name}</p>
          <p className="product-des">{description}</p>
          <p className="product-price">${price.toFixed(2)}</p>
          <p className="product-rating">Rating: {rating}</p>
        </>
      )}
      <div className="product-buttons">
        {isEditing ? (
          <>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </>
        )}
        <button onClick={handleAddCartClick}>
          {cartItems.some((item) => item.product.id === product.id) ? "Remove from Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
