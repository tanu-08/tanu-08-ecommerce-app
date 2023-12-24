import {
  SET_INI_STATE,
    ADD_PRODUCT,
    EDIT_PRODUCT,
    DELETE_PRODUCT,
    SORT_PRODUCTS,
  } from '../actions/ProductActions';
  
  const initialState = {
    products: []
  };
  
  const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_INI_STATE:
        return action.payload;
      case ADD_PRODUCT:
        return {
          ...state,
          products: [...state.products, action.payload],
        };
      case EDIT_PRODUCT:
    
        return {
          ...state,
          products: state.products.map((product) =>
            product.id === action.payload.productId
              ? action.payload.updatedProduct
              : product
          ),
        };
      case DELETE_PRODUCT:
    
        return {
          ...state,
          products: state.products.filter(
            (product) => product.id !== action.payload
          ),
        };
      case SORT_PRODUCTS:
        return {
          ...state,
          products: [...state.products].sort((a, b) => a.price - b.price),
        };
      default:
        return state;
    }
  };
  
  export default productReducer;
  