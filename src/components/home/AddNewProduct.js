import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../actions/ProductActions";
import "./AddNewProduct.css";

const AddProductComponent = ({ onProductAdded })=> {
  const dispatch = useDispatch();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productRating, setProductRating] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState("");

  const handleAddProduct = () => {
    const newProduct = {
      name: productName,
      price: parseFloat(productPrice),
      rating: parseFloat(productRating),
      description: productDescription,
      image: productImage,
    };
  
    onProductAdded(newProduct);
    
    // You may also want to send the new product to your server/API to persist in the database

    // Clear the form fields after adding the product
    setProductName("");
    setProductPrice("");
    setProductRating("");
    setProductDescription("");
    setProductImage("");
  };

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      <div className="form-group">
        <label>Name:</label>
        <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Price:</label>
        <input type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Rating:</label>
        <input type="number" value={productRating} onChange={(e) => setProductRating(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <textarea value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Image URL:</label>
        <input type="text" value={productImage} onChange={(e) => setProductImage(e.target.value)} />
      </div>
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
};

export default AddProductComponent;
