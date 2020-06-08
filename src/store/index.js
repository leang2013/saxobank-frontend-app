import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddware from 'redux-saga';
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

const toolEnv = process.env.NODE_ENV === 'development';


const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(
      ...middlewares,
    ),
    (window.devToolsExtension && toolEnv)
      ? window.devToolsExtension() : (f) => f, // Needed for redux-devtools-extension
  ),
);


const stream = getStream();
const socket = setupSocket(store.dispatch, stream);

sagaMiddleware.run(rootSaga, { socket, stream });

store.dispatch(initialHome());

export default store;
