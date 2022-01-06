import { all } from "redux-saga/effects";
import authSaga from "./auth";
import faqSaga from "./faq";

export default function* rootSaga() {
  yield all([authSaga(), faqSaga()]);
}
