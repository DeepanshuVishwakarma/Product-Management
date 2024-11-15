import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user";
import productsSlice from "./slices/products";

// Define the root reducer
const rootReducer = {
  Products: productsSlice,
  User: userSlice,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
