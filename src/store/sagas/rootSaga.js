import { all } from 'redux-saga/effects';
import tradeSaga from './tradeSaga';
import homeSaga from './homeSaga';

/**
 * saga to yield all others
 */
export default function* rootSaga() {
  yield all([
    tradeSaga(),
    homeSaga(),
  ]);
}
