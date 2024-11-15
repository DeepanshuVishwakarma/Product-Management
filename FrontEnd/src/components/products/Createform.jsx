import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useHttp from "../../hooks/useHttp";
import { Input } from "../UI/Input";
import { productsEndPoints } from "../../api/endpoints";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, updateProduct } from "../../redux/slices/products";

export const ProductForm = ({ newProduct, product = {}, onSave }) => {
  const dispatch = useDispatch();
  const User = useSelector((state) => state.User);
  const { token } = User || {};

  const [formData, setFormData] = useState({
    name: product.name || "",
    category: product.category || "",
    price: product.price || "",
    inStock: product.inStock || false,
  });

  const { isLoading, error, data, sendRequest } = useHttp();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const updatedValue =
      name === "price" ? (value ? Number(value) : "") : value;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : updatedValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const temp_url = newProduct
      ? productsEndPoints.CREATE_PRODUCT
      : `${productsEndPoints.UPDATE_PRODUCT_BY_ID_URL}/${product.id}`;
    const method = newProduct ? "POST" : "PUT";

    sendRequest({
      url: temp_url,
      method,
      body: { product: { ...formData } },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  useEffect(() => {
    if (newProduct && data?.data) {
      dispatch(addProduct(data.data));
      setFormData({
        name: product.name || "",
        category: product.category || "",
        price: product.price || "",
        inStock: product.inStock || false,
      });
    }
    if (!newProduct && data?.data) {
      dispatch(updateProduct(data.data));
    }
  }, [data]);

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTitle>
        {newProduct ? "Create a New Product" : "Update Product"}
      </FormTitle>
      <FormField>
        <Label>Name</Label>
        <StyledInput
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </FormField>
      <FormField>
        <Label>Category</Label>
        <StyledInput
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
      </FormField>
      <FormField>
        <Label>Price</Label>
        <StyledInput
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </FormField>
      <FormField>
        <Label>In Stock</Label>
        <Checkbox
          type="checkbox"
          name="inStock"
          checked={formData.inStock}
          onChange={handleChange}
        />
      </FormField>
      <SubmitButton type="submit" disabled={isLoading}>
        {isLoading ? (newProduct ? "Creating..." : "Updating...") : "Save"}
      </SubmitButton>
      {error && <ErrorMessage>Error: {error}</ErrorMessage>}
    </FormContainer>
  );
};

// Styled Components
const FormContainer = styled.form`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  text-align: center;
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const FormField = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  font-size: 1rem;
  color: #555;
  margin-bottom: 5px;
`;

const StyledInput = styled(Input)`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  &:focus {
    border-color: #007bff;
  }
`;

const Checkbox = styled.input`
  margin-right: 8px;
  width: 20px;
  height: 20px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-top: 10px;
  font-size: 0.9rem;
`;

export default ProductForm;
