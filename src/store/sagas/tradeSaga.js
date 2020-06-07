import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import { setDepth, INITIAL_TRADE } from '../../actions';
import urls from '../../config/urls';


function requestDepth(symbol) {
  return axios.request({
    method: 'get',
    url: urls.getDepth(symbol),
  });
}

function* getDepth(action) {
  const { symbol } = action;
  try {
    const { data } = yield call(requestDepth, symbol);
    yield put(setDepth(data));
  } catch (e) {
    // catch error on a bad axios call
    console.error(e);
  }
}

export default function* tradeSaga() {
  yield takeLatest(INITIAL_TRADE, getDepth);
}
