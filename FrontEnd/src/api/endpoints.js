const BASE_URL = "http://localhost:8000/api";

export const endpoints = {
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
};

export const userEndpoints = {
  DELETE_USER_API: BASE_URL + "/user/delete",
};

export const productsEndPoints = {
  CREATE_PRODUCT: BASE_URL + "/products/create",
  GET_PPRODUCT_BY_ID_URL: BASE_URL + "/products/get",
  GET_ALL_PRODUCT_URL: BASE_URL + "/products/getAll",
  DELETE_PRODUCT_BY_ID_URL: BASE_URL + "/products/delete",
  UPDATE_PRODUCT_BY_ID_URL: BASE_URL + "/products/update",
};
