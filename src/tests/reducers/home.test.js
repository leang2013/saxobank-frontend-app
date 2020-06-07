import configureMockStore from 'redux-mock-store';
import createSagaMiddware from 'redux-saga';
import nock from 'nock';
import { initialHome, setMarkets } from '../../actions';

const sagaMiddleware = createSagaMiddware();
const middlewares = [sagaMiddleware];

const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  const state = {
    saxoBank: {
      homeState: {
        marketPairs: {
          isLoaded: false,
          result: {
            ETHBTC: {
              highPrice: '0.02519900',
              lastPrice: '0.02504200',
              lowPrice: '0.02477800',
              priceChange: '0.00017500',
              priceChangePercent: '0.704',
              quoteVolume: '3419.78923649',
              symbol: 'ETHBTC',
            },
          },
          resultFiltered: ['ETHBTC', 'LTCBTC', 'BNBBTC', 'NEOBTC', 'GASBTC'],
          currentMarket: '',
          error: null,
        },
        depth: {
          isLoaded: false,
          bids: [],
          asks: [],
          error: null,
        },
      },
    },
  };

  afterEach(() => {
    nock.cleanAll();
  });

  it('initial home', () => {
    // return of async actions
    const store = mockStore(state);
    store.dispatch(initialHome());
    expect(store.getActions()).toEqual([{ type: 'INITIAL_HOME' }]);
  });

  it('fetching data markets', () => {
    const mockResponse = {
      symbol: 'BNBBTC',
      priceChange: '-94.99999800',
      priceChangePercent: '-95.960',
      weightedAvgPrice: '0.29628482',
      prevClosePrice: '0.10002000',
      lastPrice: '4.00000200',
      lastQty: '200.00000000',
      bidPrice: '4.00000000',
      askPrice: '4.00000200',
      openPrice: '99.00000000',
      highPrice: '100.00000000',
      lowPrice: '0.10000000',
      volume: '8913.30000000',
      quoteVolume: '15.30000000',
      openTime: 1499783499040,
      closeTime: 1499869899040,
      firstId: 28385, // First tradeId
      lastId: 28460, // Last tradeId
      count: 76, // Trade count
    };

    nock('http://api.binance.com').get('/api/v3/ticker/24hr').reply(200, mockResponse);

    const store = mockStore(state);
    store.dispatch(setMarkets(mockResponse));
    expect(store.getActions()).toEqual([{ type: 'SET_MARKET', data: mockResponse }]);
  });
});
