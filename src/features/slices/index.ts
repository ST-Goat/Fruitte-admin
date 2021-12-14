import { combineReducers } from "@reduxjs/toolkit";
import { connectRouter } from "connected-react-router";
import history from "utilities/history";

import autReducer from "./auth";

const rootReducer = combineReducers({
  router: connectRouter(history),
  auth: autReducer,
});

export default rootReducer;
