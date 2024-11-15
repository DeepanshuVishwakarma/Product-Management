import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { endpoints } from "../api/endpoints";
import { Input } from "../components/UI/Input";
import useHttp from "../hooks/useHttp";
import { setIsSignedIn, setToken, setUser } from "../redux/slices/user";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const {
    isLoading: isLoadingLogin,
    error: isErrorLogin,
    data: dataLogin,
    sendRequest: sendRequestLogin,
  } = useHttp();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 4)
      newErrors.password = "Password must be at least 4 characters";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async () => {
    if (!validate()) {
      console.log(errors);
      return;
    }

    sendRequestLogin({
      url: endpoints.LOGIN_API,
      method: "POST",
      body: formData,
    });
  };
  useEffect(() => {
    console.log("Sending login", dataLogin);
    if (dataLogin && dataLogin.success) {
      //settoken
      // setSignedin true
      //naviate to application ("/")
      console.log("login", dataLogin);
      dispatch(setIsSignedIn(true));
      dispatch(setToken(dataLogin?.token));
      dispatch(setUser(dataLogin?.user));
      navigate("/");
    }
    if (dataLogin && !dataLogin.success) {
      console.log("Error: " + dataLogin.message);
    }
  }, [dataLogin]);

  return (
    <div>
      <h2>Log IN</h2>
      <div>
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

        <button onClick={onSubmit} disabled={isLoadingLogin}>
          {isLoadingLogin ? "Logging in..." : "Login"}
        </button>

        {isErrorLogin && <p>{isErrorLogin}</p>}
      </div>
      {dataLogin && <p>Logged in successful!</p>}
    </div>
  );
};

export default Login;
