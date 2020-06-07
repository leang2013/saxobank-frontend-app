import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../reducers';
import rootSaga from './sagas/rootSaga';
import setupSocket from '../sockets';
import { getStream } from '../utils';
import { initialHome } from '../actions';

const sagaMiddleware = createSagaMiddware();
const middlewares = [sagaMiddleware];

const rootReducer = combineReducers({
  saxoBank: reducer,
});


const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(...middlewares),
  // other store enhancers if any
));


const stream = getStream();
const socket = setupSocket(store.dispatch, stream);

sagaMiddleware.run(rootSaga, { socket, stream });

store.dispatch(initialHome());

export default store;
