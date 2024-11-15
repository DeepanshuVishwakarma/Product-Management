import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  isLoading: false,
  error: null,
  isSignedIn: false,
  token: null,
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsUserLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setIsSignedIn: (state, action) => {
      state.isSignedIn = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
      state.isSignedIn = false;
      state.token = null;
    },
  },
});

export const {
  setUser,
  setIsUserLoading,
  setError,
  setIsSignedIn,
  setToken,
  logout,
} = userSlice.actions;
export default userSlice.reducer;
