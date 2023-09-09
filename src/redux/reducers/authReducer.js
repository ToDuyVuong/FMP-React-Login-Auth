import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  token: "",
  user: null,
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
  },
});

export const { loginSuccess, logoutSuccess, refreshAccessTokenSuccess } =
  authReducer.actions;
export default authReducer.reducer;
