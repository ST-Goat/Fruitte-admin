import { combineReducers } from "@reduxjs/toolkit";
import { connectRouter } from "connected-react-router";
import history from "utilities/history";

import autReducer from "./auth";
import snackBarReducer from "./snackbar";
import farmReducer from "./farm";

const rootReducer = combineReducers({
  router: connectRouter(history),
  auth: autReducer,
  snackbar: snackBarReducer,
  farm: farmReducer,
});

export default rootReducer;
