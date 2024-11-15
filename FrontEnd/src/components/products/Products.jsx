import { ProductForm } from "./Createform";
import React, { useEffect, useState } from "react";
import { productsEndPoints } from "../../api/endpoints";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../hooks/useHttp";
import { deleteOneProduct, setProducts } from "../../redux/slices/products";

const SingleProduct = ({ product, onUpdate }) => {
  const dispatch = useDispatch();

  const User = useSelector((state) => state.User);
  const { user, isSignedIn, token } = User || {};

  const { isLoading, error, data, sendRequest } = useHttp();

  const [isDeleted, setIsDeleted] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateClick = () => {
    if (!isSignedIn) {
      alert("please log in first");
      return;
    }
    setIsUpdating(true);
  };

  const handleSave = () => {
    setIsUpdating(false);
    onUpdate();
  };
  const handleDeleteClick = async () => {
    if (!isSignedIn) {
      alert("please log in first");
      return;
    }
    const id = product?.id;
    if (!id) {
      console.error("Product id is missing ");
      return;
    }
    await sendRequest({
      url: `${productsEndPoints.DELETE_PRODUCT_BY_ID_URL}/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  useEffect(() => {
    if (data?.success) {
      console.log("data", data);
      dispatch(deleteOneProduct(product));
      if (!isDeleted) setIsDeleted(() => true);
    }
  }, [isLoading]);
  return !isDeleted ? (
    <div style={{ width: "50%" }}>
      <h3>Product Details</h3>
      <div>name: {product.name}</div>
      <div>price: {product.price}</div>
      <div>category: {product.category}</div>
      <div>inStock: {product.inStock ? "Yes" : "No"}</div>

      <button onClick={handleDeleteClick}>Delete Product</button>
      <button onClick={handleUpdateClick}>Update Product</button>

      {isUpdating && isSignedIn && (
        <ProductForm newProduct={false} product={product} onSave={handleSave} />
      )}
    </div>
  ) : (
    <div>Product Deleted Succesfully</div>
  );
};

export default function Products() {
  const User = useSelector((state) => state.User);
  const { user, isSignedIn, token } = User || {};

  const dispatch = useDispatch();
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const products = useSelector((state) => state.Products.products);
  const { isLoading, error, data, sendRequest } = useHttp();

  useEffect(() => {
    sendRequest({
      url: productsEndPoints.GET_ALL_PRODUCT_URL,
      method: "GET",
    });
  }, []);

  useEffect(() => {
    if (data) {
      console.log("Fetched Products:", data);
      dispatch(setProducts(data.data));
    }
    if (error) {
      console.error("Error fetching products:", error);
    }
  }, [data, error]);

  const handleProductClick = (product) => {
    setCurrentProduct(product);
    setIsCreating(false);
  };

  const handleCreateClick = () => {
    if (!isSignedIn) {
      alert("please log in first");
      return;
    }
    setIsCreating(true);
    setCurrentProduct(null);
  };

  const handleSave = () => {
    setIsCreating(false);
    setCurrentProduct(null);
    sendRequest({ url: productsEndPoints.GET_ALL_PRODUCT_URL, method: "GET" });
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ width: "50%" }}>
        <h2>Products List</h2>
        {isLoading && <p>Loading products...</p>}
        {error && <p>Error: {error}</p>}
        {products && products?.length > 0 && (
          <div style={{ color: "gray", marginBottom: "1em" }}>
            click on any product to view the product details
          </div>
        )}
        {products &&
          products?.length > 0 &&
          products.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product)}
              style={{ cursor: "pointer", marginBottom: "10px" }}
            >
              <div>name: {product.name}</div>
              <div>price: {product.price}</div>
            </div>
          ))}
        <button onClick={handleCreateClick}>Create New Product</button>
        {isCreating && isSignedIn && (
          <ProductForm newProduct={true} onSave={handleSave} />
        )}
      </div>

      {currentProduct && (
        <SingleProduct product={currentProduct} onUpdate={handleSave} />
      )}
    </div>
  );
}
