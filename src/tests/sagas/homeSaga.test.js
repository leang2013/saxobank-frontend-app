import { put, takeLatest } from 'redux-saga/effects';
import homeSaga, { getInitialHome } from '../../store/sagas/homeSaga';


describe('HomeSaga', () => {
  let generator;

  beforeAll(() => {
    generator = homeSaga();
  });


  it('getInitialHome', () => {
    const actionType = 'INITIAL_HOME';
    put({ type: actionType });
    const actual = generator.next();
    expect(actual.value).toEqual(takeLatest(actionType, getInitialHome));
  });
});
