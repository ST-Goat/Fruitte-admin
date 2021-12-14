import { createSlice } from "@reduxjs/toolkit";

export type AuthType = {
  phone: string;
};

const initialState: AuthType = {
  phone: "",
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state, action) => {},
    loginSuccess: (state, action) => {
      console.log("login success");
    },
    loginFailure: (state, action) => {
      console.log("login fail");
    },
    logoutRequest: (state, action) => {},
  },
});

export const { loginRequest, loginSuccess, loginFailure, logoutRequest } =
  AuthSlice.actions;

export default AuthSlice.reducer;
