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

const dataDepthAsk = (state, newData, lastUpdateId) => {
  let asks;
  const { u, U, a } = newData;

  if (u) {
    if (u <= lastUpdateId) return state;
    if (U <= lastUpdateId + 1 && u >= lastUpdateId + 1) {
      asks = a;
    } else {
      asks = a;
    }
  }
  asks = a;
  asks = asks.slice(0, 10);
  const result = state.slice(0, state.length - asks.length);
  result.push(...asks);
  return result.sort((itemA, itemB) => itemB[0] - itemA[0]);
};

const dataDepthBid = (state, newData, lastUpdateId) => {
  let bids;
  const { u, U, b } = newData;

  if (u) {
    if (u <= lastUpdateId) return state;
    if (U <= lastUpdateId + 1 && u >= lastUpdateId + 1) {
      bids = b;
    } else {
      bids = b;
    }
  }
  bids = b;
  bids = bids.slice(0, 10);
  const result = state.slice(0, state.length - bids.length);
  result.push(...bids);
  return result.sort((itemA, itemB) => itemA[0] - itemB[0]);
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
      return {
        ...state,
        isLoaded: true,
        depth: {
          ...state.depth,
          bids: [
            ...dataDepthBid(state.depth.bids, action.data, state.depth.lastUpdateId),
          ],
          asks: [
            ...dataDepthAsk(state.depth.asks, action.data, state.depth.lastUpdateId),
          ],
        },
      };
    default:
      return state;
  }
};

export default Depth;
