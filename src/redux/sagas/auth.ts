import { PayloadAction } from "@reduxjs/toolkit";
import { push } from "connected-react-router";
import { call, delay, fork, put, take } from "redux-saga/effects";
import {
  loginRequest,
  logoutRequest,
  loginSuccess,
  loginFailure,
} from "../slices/auth";
import { enqueueSnackbar } from "redux/slices/snackbar";

import { homepageUrl, loginUrl } from "routes";
import { login, LoginPayload } from "services/authentication";
import CONFIGS from "shared/configs";
import { SNACKBAR_VARIANTS } from "shared/comom.enum";

function* handleLogin(payload: LoginPayload) {
  try {
    const { data } = yield call(login, payload);
    localStorage.setItem(CONFIGS.HEADER_PAYLOAD_KEY, data.access_token);
    yield put(loginSuccess(data));
    yield put(push(homepageUrl));
    // redirect to admin page
  } catch (error) {
    yield put(loginFailure(error));
    yield put(
      enqueueSnackbar({
        message: "Login failed!",
        variant: SNACKBAR_VARIANTS.ERROR,
      })
    );
    yield put(logoutRequest(null));
  }
}

function* handleLogout() {
  yield delay(500);
  localStorage.removeItem(CONFIGS.HEADER_PAYLOAD_KEY);
  // redirect to login page
  yield put(push(loginUrl));
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(
      localStorage.getItem(CONFIGS.HEADER_PAYLOAD_KEY)
    );
    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(loginRequest.type);
      yield fork(handleLogin, action.payload);
    }
    yield take(logoutRequest.type);
    yield call(handleLogout);
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
