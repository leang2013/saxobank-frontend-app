import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Table from '../../components/table';

describe('component', () => {
  it('Should contain the number ETHBTC', () => {
    const mockMarketPairs = {
      ETHBTC: {
        highPrice: '0.02519900',
        lastPrice: '0.02504200',
        lowPrice: '0.02477800',
        priceChange: '0.00017500',
        priceChangePercent: '0.704',
        quoteVolume: '3419.78923649',
        symbol: 'ETHBTC',
      },
    };
    const mockMarketPairsFilter = ['ETHBTC', 'LTCBTC', 'BNBBTC', 'NEOBTC', 'GASBTC'];

    const { getByText } = render(<Router><Table ticker={mockMarketPairs} filter={mockMarketPairsFilter} /></Router>);
    const linkElement = getByText(/ETHBTC/i);
    expect(linkElement).toBeInTheDocument();
  });
});
