// App.js
import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import  Store  from './reducers/ProductsStore'; // Make sure to provide the correct path

import './App.css';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <Provider store={Store}>
      <div className="App">
        <Navbar />
      </div>

    </Provider>
    
  );
}

export default App;

