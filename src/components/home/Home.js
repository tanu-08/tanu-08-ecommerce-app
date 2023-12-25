import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setInitialState, deleteProduct, sortProducts, addProduct,addToCart,removeFromCart } from "../../actions/ProductActions";
import ProductCard from "./ProductCard";
import "../home/Home.css";
import { v4 as uuidv4 } from "uuid";
import Notification from "../../Notification";
import AddProductComponent from "./AddNewProduct";

//json-server --watch db.json --port 3001

const Home = ({updateCartCount}) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [buttonText, setButtonText] = useState("Sort By Price");
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, [dispatch, products]);

  //notification alert
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification(null);
    }, 2000);
    return () => clearTimeout(timer);
  }, [notification]);

  //fetch all products
  const fetchProducts = () => {
    fetch("http://localhost:3001/products")
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

  //fetch cart items
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

//delete product
  const handleDelete = async (productId) => {
    try {
      await fetch(`http://localhost:3001/products/${productId}`, {
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

  //edit product
  const handleEditSuccess = () => {
    setNotification({ type: 'success', message: 'Product updated successfully!' });
  };

  const handleEditError = () => {
    setNotification({ type: 'error', message: 'Error updating product!' });
  };

  //sort products according to price
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

  //add product to cart
  const handleAddProduct = async (newProductData) => {
    try {
      const response = await fetch("http://localhost:3001/products", {
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

  const handleToggleCart = async (product) => {
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
            //  <Link to={`/product/${product.id}`}>
             <ProductCard
               product={product}
               onDelete={handleDelete}
               onEditSuccess={handleEditSuccess}
               onEditError={handleEditError}
               onAddCart={handleToggleCart}
               cartItems={cartItems}
             />
           
          ))}
        </div>
      </div>
   
  );
};

export default Home;
