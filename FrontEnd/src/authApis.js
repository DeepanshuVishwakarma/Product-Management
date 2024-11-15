import { setToken } from "../../store/reducers/authSlice";
import axios from "../../hooks/axios";
import {
  setIsSignedIn,
  setUser,
  setIsUserLoading,
  setError,
} from "../../store/reducers/user";
import { endpoints } from "./api/endpoints";

const { LOGIN_API } = endpoints;

export function login(email, password, navigate) {
  return async (dispatch) => {
    dispatch(setIsUserLoading(true));
    try {
      console.log("login: loading...");
      if (!LOGIN_API) {
        throw new Error("Login API/url is not available");
      }
      const response = await axios(LOGIN_API, {
        method: "POST",
        data: {
          email,
          password,
        },
      });

      console.log("LOGIN API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      console.log("data ", response.data);
      console.log("login, SUCCESSFUL");

      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.user));
      dispatch(setIsSignedIn(true));

      navigate("/");
    } catch (error) {
      dispatch(setError(true));
      console.error("LOGIN API ERROR............", error);
    }
    dispatch(setIsUserLoading(false));
  };
}
