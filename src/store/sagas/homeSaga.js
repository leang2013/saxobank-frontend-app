import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import { setMarkets, INITIAL_HOME } from '../../actions';
import urls from '../../config/urls';
import { getTickerByTicker } from '../../utils';

function requestMarket() {
  return axios.request({
    method: 'get',
    url: urls.getMarkets,
  });
}

const symbols = ['BTCUSDT', 'ETHUSDT', 'XRPUSDT', 'EOSUSDT', 'LTCUSDT', 'ETCUSDT', 'BNBUSDT', 'VETUSDT'];

export function* getInitialHome() {
  const pathName = window.location.pathname;
  if (pathName === '/') {
    try {
      const { data } = yield call(requestMarket);
      const dataFiltered = data.filter((item) => symbols.includes(item.symbol));
      const result = getTickerByTicker(dataFiltered);
      yield put(setMarkets(result));
    } catch (e) {
    // catch error on a bad axios call
      console.error(e);
    }
  }
}

export default function* homeSaga() {
  yield takeLatest(INITIAL_HOME, getInitialHome);
}
