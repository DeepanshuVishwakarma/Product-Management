import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    deleteOneProduct: (state, action) => {
      console.log("deleteOneProduct called", action.payload);

      const productId = action.payload.id;
      state.products = state.products.filter((item) => item.id !== productId);
    },
    updateProduct: (state, action) => {
      const updatedProduct = action.payload;
      state.products = state.products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      );
    },

    addProduct: (state, action) => {
      const newProduct = action.payload;
      state.products.push(newProduct);
    },

    replaceProduct: (state, action) => {
      const updatedProduct = action.payload;
      const index = state.products.findIndex(
        (product) => product.id === updatedProduct.id
      );
      if (index !== -1) {
        state.products[index] = updatedProduct;
      }
    },
  },
});

export const {
  setProducts,
  deleteOneProduct,
  updateProduct,
  addProduct,
  replaceProduct,
} = productSlice.actions;
export default productSlice.reducer;
