import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import propTypes, { func } from 'prop-types';
import Loading from '../../components/loading';
import OrderBook from '../../components/orderBook';
import { initialTrade } from '../../actions';
import setupSocket, { disconnectSocket } from '../../sockets';
import { getStream } from '../../utils';

const Trade = ({
  loadedDepth, depth, match, getInitialTrade, initSocket,
}) => {
  const [currentMarket, setcurrentMarket] = React.useState('');
  const { bids, asks } = depth;
  const { market } = match.params;
  const stream = getStream();
  if (market !== currentMarket) setcurrentMarket(market);

  useEffect(() => {
    getInitialTrade(currentMarket);
    const socket = initSocket(stream);
    return () => {
      disconnectSocket(socket);
    };
  }, [currentMarket]);

  return (
    <>
      { (!loadedDepth) && <Loading /> }
      {loadedDepth
                && (
                <div>
                  <OrderBook bids={bids} asks={asks} market={market} />
                </div>
                )}
    </>
  );
};

const mapStateToProps = (state) => ({
  loadedDepth: state.saxoBank.tradeState.isLoaded,
  depth: state.saxoBank.tradeState.depth || {},
});

const mapDispacthProps = (dispatch) => ({
  getInitialTrade: (data) => dispatch(initialTrade(data)),
  initSocket: (stream) => setupSocket(dispatch, stream),
});

Trade.defaultProps = {
  loadedDepth: false,
  depth: '',
  match: '',
  getInitialTrade: func,
  initSocket: propTypes.func,
};

Trade.propTypes = {
  loadedDepth: propTypes.bool,
  depth: propTypes.object,
  match: propTypes.object,
  initSocket: propTypes.func,
  getInitialTrade: propTypes.func,
};

export default connect(mapStateToProps, mapDispacthProps)(Trade);
