import { createSlice } from "@reduxjs/toolkit";

export type AuthData = {
  mobile: string;
};

export type AuthType = {
  data: AuthData | null;
  loading: boolean;
  errorMessage: string;
};

const initialState: AuthType = {
  data: null,
  loading: false,
  errorMessage: "",
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state, action) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.data = { ...action.payload };
      state.loading = false;
      state.errorMessage = "";
      console.log("login success");
    },
    loginFailure: (state, action) => {
      const { data } = action.payload.response;
      if (Boolean(data)) {
        state.errorMessage = data.error.message;
      }
      state.loading = false;
      console.log("login fail");
    },
    logoutRequest: (state, action) => {},
  },
});

export const { loginRequest, loginSuccess, loginFailure, logoutRequest } =
  AuthSlice.actions;

export default AuthSlice.reducer;
