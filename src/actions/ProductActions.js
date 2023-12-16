// actionTypes.js
export const SET_INI_STATE = "Set Initial State";
export const ADD_PRODUCT = "Add Product";
export const EDIT_PRODUCT = "Edit Product";
export const DELETE_PRODUCT = "Delete Product";
export const SORT_PRODUCTS = "Sort Products";

// actions.js

export const setInitialState = (initialState) => ({
    type: SET_INI_STATE,
    payload: initialState,
  });

export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: product,
});

export const editProduct = (productId, updatedProduct) => ({
  type: EDIT_PRODUCT,
  payload: {
    productId,
    updatedProduct,
  },
});

export const deleteProduct = (productId) => ({
  type: DELETE_PRODUCT,
  payload: productId,
});

export const sortProducts = (sortBy) => ({
  type: SORT_PRODUCTS,
  payload: sortBy,
});
