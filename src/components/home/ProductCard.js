// ProductCard.js
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const { name, description, price, rating, image } = product;

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={image} alt={name} />
      </div>
      <p className="product-name">{name}</p>
      <p className="product-des">{description}</p>
      <p className="product-price">${price.toFixed(2)}</p>
      <p className="product-rating">Rating: {rating}</p>
    </div>
  );
};

export default ProductCard;
