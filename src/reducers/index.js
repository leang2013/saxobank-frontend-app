import { combineReducers } from 'redux';
import homeReducer from './home';
import tradeReducer from './trade';

export default combineReducers({
  homeState: homeReducer,
  tradeState: tradeReducer,
});
