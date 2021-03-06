import { PayloadAction } from "@reduxjs/toolkit";
import { push } from "connected-react-router";
import { call, delay, fork, put, take } from "redux-saga/effects";
import {
  loginRequest,
  logoutRequest,
  loginSuccess,
  loginFailure,
} from "../slices/auth";

import { homepageUrl, loginUrl } from "routes";
import { login, LoginPayload } from "services/authentication";

import CONFIGS from "shared/configs";
import { addTokenToStorage, removeTokenInStorage } from "utilities/helper";

function* handleLogin(payload: LoginPayload) {
  try {
    const { data } = yield call(login, payload);
    addTokenToStorage({
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    });
    yield put(loginSuccess(data));
    yield put(push(homepageUrl));
    // redirect to admin page
  } catch (error) {
    yield put(loginFailure(error));
    yield put(logoutRequest(null));
  }
}

function* handleLogout() {
  yield delay(500);
  removeTokenInStorage();
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
