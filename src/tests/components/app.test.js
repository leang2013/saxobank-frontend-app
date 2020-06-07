import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import App from '../../App';

describe('Component App', () => {
  let store;

  const mockStore = configureMockStore();

  const state = {
    saxoBank: {
      homeState: {
        markets: {
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

  beforeEach(() => {
    store = mockStore(state);
  });

  it('should render with given state from Redux store', () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    const linkElement = getByText(/Saxo Bank/i);
    expect(linkElement).toBeInTheDocument();
  });
});
