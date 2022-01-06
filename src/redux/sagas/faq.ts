import { takeEvery, call, put } from "redux-saga/effects";
import { FaqItem, fetchAllFaq } from "services/faq";
import { getAllFaq, getAllFaqSuccess, getAllFaqFailed } from "redux/slices/faq";

function* fetchFaqDataSaga() {
  try {
    const response: FaqItem[] = yield call(fetchAllFaq);
    yield put(getAllFaqSuccess({ data: response }));
  } catch (error) {
    yield put(getAllFaqFailed(null));
  }
}

export default function* faqSaga() {
  yield takeEvery(getAllFaq.type, fetchFaqDataSaga);
}
