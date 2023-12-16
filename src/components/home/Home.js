// Home.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, setInitialState } from "../../actions/ProductActions";
import ProductCard from "./ProductCard";
import "../home/Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the API only if products are not already in the store
    if (products.length === 0) {
      fetch("https://my-json-server.typicode.com/tanu-08/tanu-08-ecommerce-app/products")
        .then((response) => response.json())
        .then((data) => {
          // Dispatch an action to set the initial state
          dispatch(setInitialState({ products: data }));
          setLoading(false); // Set loading to false once data is fetched
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false); // Set loading to false in case of an error
        });
    } else {
      setLoading(false); // Set loading to false if products are already in the store
    }
  }, [dispatch, products]); // Include 'dispatch' as a dependency

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="home">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Home;
