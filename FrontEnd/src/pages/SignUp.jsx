import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { endpoints } from "../api/endpoints";
import { Input } from "../components/UI/Input";
import useHttp from "../hooks/useHttp";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "", // Changed this from firstName to name
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const {
    isLoading: isLoadingSignUp,
    error: isErrorSignUp,
    data: dataSignUp,
    sendRequest: sendRequestSignUp,
  } = useHttp();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    console.log("validating the signup form data", formData);
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 4)
      newErrors.password = "Password must be at least 4 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async () => {
    if (!validate()) {
      console.log("invalid form", errors);
      return;
    }
    console.log("sending request for signup");
    sendRequestSignUp({
      url: endpoints.SIGNUP_API,
      method: "POST",
      body: formData,
    });
  };

  useEffect(() => {
    console.log("dataSign up", dataSignUp);
    if (dataSignUp && dataSignUp.success) {
      console.log(dataSignUp);
      navigate("/login");
    }
    if (dataSignUp && !dataSignUp.success) {
      console.log("Error: " + dataSignUp.message);
    }
  }, [dataSignUp]);

  return (
    <div>
      <h2>Signup</h2>
      <div>
        <div>
          <label>Name</label>
          <Input
            type="text"
            name="name" // Changed from firstName to name
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>

        <div>
          <label>Email</label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label>Password</label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div>
          <label>Confirm Password</label>
          <Input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        </div>
        <button onClick={onSubmit} disabled={isLoadingSignUp}>
          {isLoadingSignUp ? "Signing up..." : "Signup"}
        </button>
        {isErrorSignUp && <p>{isErrorSignUp}</p>}
      </div>
      {dataSignUp && <p>Signup successful!</p>}
    </div>
  );
};

export default Signup;
