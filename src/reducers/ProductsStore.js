// ProductsStore.js
import { createStore } from "redux"; // Correct import statement
import productReducer from "./HomeReducer";

// Create the Redux store
const Store = createStore(productReducer);

export default Store;
