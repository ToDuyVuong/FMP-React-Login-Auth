import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  token: "",
  user: null,
  message: "",
  email: "",
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.data.token;
      state.user = action.payload.data;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.token = "";
      state.user = null;
    },
    refreshAccessTokenSuccess: (state, action) => {
      state.token = action.payload.data.token;
    },

    setMessage: (state, action) => {
      state.message = action.payload.message;
      state.email = action.payload.data.email;
    },
  },
});

export const {
  loginSuccess,
  logoutSuccess,
  refreshAccessTokenSuccess,
  setMessage,
} = authReducer.actions;
export default authReducer.reducer;
