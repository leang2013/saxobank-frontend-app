import {
  INITIAL_HOME, UPDATE_MARKET, SET_MARKET, SET_FILTER_MARKET,
} from '../actions';

const initialState = {
  loading: false,
  isLoaded: false,
  markets: {
    result: {},
    resultFiltered: null,
    currentMarket: '',
  },
  error: null,
};

const Market = (state = initialState, action) => {
  switch (action.type) {
    case INITIAL_HOME:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_MARKET:
      return {
        ...state,
        markets: {
          ...state.markets,
          result: {
            ...state.markets.result,
            ...action.data,
          },
        },
      };
    case SET_MARKET:
      return {
        ...state,
        isLoaded: true,
        markets: {
          result: action.data,
          currentMarket: 'BTCUSDT',
          resultFiltered: Object.keys(action.data).filter((item) => item.endsWith('BTCUSDT')),
        },
      };
    case SET_FILTER_MARKET:
      return {
        ...state,
        markets: {
          ...state.markets,
          resultFiltered: Object.keys(state.markets.result)
            .filter((item) => item.endsWith(action.data)),
        },
      };
    default:
      return state;
  }
};

export default Market;
