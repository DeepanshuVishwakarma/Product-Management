import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./redux/store";
import "./App.css";
import Navbar from "./components/Navbar";
import Products from "./components/products/Products";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import { Provider } from "react-redux";

function ProductManagement() {
  return (
    <div>
      <Products />
    </div>
  );
}

function App() {
  if (!store) console.error("store is not provided");
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<ProductManagement />} />

          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
