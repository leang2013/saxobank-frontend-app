export const INITIAL_HOME = 'INITIAL_HOME';
export const SET_MARKET = 'SET_MARKET';
export const UPDATE_MARKET = 'UPDATE_MARKET';
export const SET_FILTER_MARKET = 'SET_FILTER_MARKET';
export const INITIAL_TRADE = 'INITIAL_TRADE';
export const SET_DEPTH = 'SET_DEPTH';
export const UPDATE_DEPTH = 'UPDATE_DEPTH';

export const initialHome = () => ({
  type: INITIAL_HOME,
});

export const setMarkets = (data) => ({
  type: SET_MARKET,
  data,
});

export const updateMarkets = (data) => ({
  type: UPDATE_MARKET,
  data,
});

export const setFilterMarket = (data) => ({
  type: SET_FILTER_MARKET,
  data,
});

export const initialTrade = (symbol) => ({
  type: INITIAL_TRADE,
  symbol,
});

export const setDepth = (data) => ({
  type: SET_DEPTH,
  data,
});

export const updateDepth = (data) => ({
  type: UPDATE_DEPTH,
  data,
});
