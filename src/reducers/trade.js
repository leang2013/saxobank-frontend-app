import {
  INITIAL_TRADE, SET_DEPTH, UPDATE_DEPTH,
} from '../actions';

const initialState = {
  isLoaded: false,
  depth: {
    lastUpdateId: null,
    bids: [],
    asks: [],
    eventU: '',
  },
  error: null,
};

const filteredDepth = (lastUpdateId, data) => {
  let result;
  const { u, U } = data;

  if (u <= lastUpdateId) return result;

  const lastUpdated = lastUpdateId + 1;
  if (U <= lastUpdated && u >= lastUpdated) result = data;

  result = data;

  return result;
};

const dataDepthAsk = (state, update) => {
  const newData = update.slice(0, 10);
  const result = state.slice(0, state.length - newData.length);
  result.push(...newData);
  return result.sort((a, b) => b[0] - a[0]);
};

const dataDepthBid = (state, update) => {
  const newData = update.slice(0, 10);
  const result = state.slice(0, state.length - newData.length);
  result.push(...newData);
  return result.sort((a, b) => a[0] - b[0]);
};

const Depth = (state = initialState, action) => {
  switch (action.type) {
    case INITIAL_TRADE:
      return {
        ...state,
        loading: true,
      };
    case SET_DEPTH:
      return {
        ...state,
        isLoaded: true,
        depth: {
          ...state.depth,
          lastUpdateId: action.data.lastUpdateId,
          bids: action.data.bids.slice(0, 10),
          asks: action.data.asks.slice(0, 10),
        },
      };
    case UPDATE_DEPTH:
      if (filteredDepth(state.depth.lastUpdateId, action.data)) {
        return {
          ...state,
          isLoaded: true,
          depth: {
            ...state.depth,
            bids: [
              ...dataDepthBid(state.depth.bids, action.data.b),
            ],
            asks: [
              ...dataDepthAsk(state.depth.asks, action.data.a),
            ],
          },
        };
      }
      return state;
    default:
      return state;
  }
};

export default Depth;
