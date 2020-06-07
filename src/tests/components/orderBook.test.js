import React from 'react';
import { render } from '@testing-library/react';
import OrderBook from '../../components/orderBook';

describe('component', () => {
  it('Should contain the number 2512', () => {
    const mockBids = [['0.02512000', '7.00000000']];
    const mockAsks = [['0.02518000', '7.00000000']];
    const { getByText } = render(<OrderBook bids={mockBids} asks={mockAsks} />);
    const linkElement = getByText(/2512/i);
    expect(linkElement).toBeInTheDocument();
  });
});
