// Home.js

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setInitialState, deleteProduct, sortProducts, addProduct } from "../../actions/ProductActions";
import ProductCard from "./ProductCard";
import "../home/Home.css";
import Notification from "../../Notification";
import AddProductComponent from "./AddNewProduct";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [buttonText, setButtonText] = useState("Sort By Price");
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, [dispatch, products]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification(null);
    }, 2000);
    return () => clearTimeout(timer);
  }, [notification]);

  const fetchProducts = () => {
    fetch("https://my-json-server.typicode.com/tanu-08/tanu-08-ecommerce-app/products")
      .then((response) => response.json())
      .then((data) => {
        dispatch(setInitialState({ products: data }));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const handleDelete = async (productId) => {
    try {
      await fetch(`https://my-json-server.typicode.com/tanu-08/tanu-08-ecommerce-app/products/${productId}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          dispatch(deleteProduct(productId));
        });
      setNotification({ type: 'success', message: 'Product deleted successfully!' });
    } catch (error) {
      console.error("Error deleting product:", error);
      setNotification({ type: 'error', message: 'Error deleting product!' });
    }
  };

  const closeNotification = () => {
    setNotification(null);
  };

  const handleEditSuccess = () => {
    setNotification({ type: 'success', message: 'Product updated successfully!' });
  };

  const handleEditError = () => {
    setNotification({ type: 'error', message: 'Error updating product!' });
  };

  const handleSort = () => {
    if (sortAsc) {
      dispatch(sortProducts("asc"));
      setSortAsc(false);
      setButtonText("Reset");
    } else {
      fetchProducts();
      setSortAsc(true);
      setButtonText("Sort By Price");
    }
  };
  const toggleAddProductModal = () => {
    setShowAddProductModal(!showAddProductModal);
  };

  const handleAddProduct = async (newProductData) => {
    try {
      const response = await fetch("https://my-json-server.typicode.com/tanu-08/tanu-08-ecommerce-app/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProductData),
      });

      const data = await response.json();
      dispatch(addProduct(data));
      // Close the modal and refresh the product list
      toggleAddProductModal();
      setNotification({ type: 'success', message: 'Product added successfully!' });
    } catch (error) {
      console.error("Error adding product:", error);
      setNotification({ type: 'error', message: 'Error adding product!' });
    }
  };

  const handleProductAdded = () => {
    
  };


  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="home">
       {showAddProductModal && (
        <div className="modal-overlay">
          <AddProductComponent onProductAdded={handleAddProduct} />
        </div>
      )}
      {notification != null ? (
        <div className="notification">
          {notification && (
            <Notification type={notification.type} message={notification.message} onClose={closeNotification} />
          )}
        </div>
      ) : null}
      <div className="add-sort">
      <button className="add-new-product" onClick={toggleAddProductModal}>
          Add New Product
        </button>
        <button className="sort-button" onClick={handleSort}>
          {buttonText}
        </button>
      </div>
      <div className="products">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={handleDelete}
            onEditSuccess={handleEditSuccess}
            onEditError={handleEditError}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
