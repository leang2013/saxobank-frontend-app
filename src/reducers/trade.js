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

const filteredDepth = (lastUpdateId, eventU, data) => {
  let result;
  const { u, U } = data;

  if (u <= lastUpdateId) return result;

  const lastUpdated = lastUpdateId + 1;
  if (U <= lastUpdated && u >= lastUpdated) result = data;

  result = data;

  return result;
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
          bids: action.data.bids,
          asks: action.data.asks,
        },
      };
    case UPDATE_DEPTH:
      if (filteredDepth(state.depth.lastUpdateId, state.depth.eventU, action.data)) {
        return {
          ...state,
          isLoaded: true,
          depth: {
            ...state.depth,
            eventU: (action.data) ? action.data.u : state.depth.eventU,
            bids: [
              ...action.data.b,
            ],
            asks: [
              ...action.data.a,
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
