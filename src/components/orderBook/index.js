import React from 'react';
import BigNumber from 'bignumber.js';
import { makeStyles } from '@material-ui/core/styles';
import propTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    minHeight: 700,
  },
});

const OrderRow = ({ i, ba }) => (
  <TableRow key={`${i}:${ba[0]}:${ba[1]}`}>
    <TableCell>{new BigNumber(ba[0]).toFormat(null, 1)}</TableCell>
    <TableCell>{new BigNumber(ba[1]).toFormat(null, 1)}</TableCell>
  </TableRow>
);

const OrderBook = ({ market, bids, asks }) => {
  const resultBids = [];
  const resultAsks = [];
  const numRowsBid = Math.min(20, bids.length);
  const numRowsAsk = Math.min(20, asks.length);
  const maxBid = BigNumber.maximum(bids.map((bid) => bid[0])).toFormat();
  const minAsk = BigNumber.minimum(asks.map((ask) => ask[0])).toFormat();
  const minBid = new BigNumber(maxBid)
    .minus(BigNumber.minimum(
      bids.map((bid) => bid[0]),
    )).toFormat();
  const maxAsk = new BigNumber(minAsk)
    .minus(BigNumber.maximum(
      bids.map((ask) => ask[0]),
    )).toFormat();
  for (let b = 0; b < numRowsBid; b++) {
    resultBids.push(
      <OrderRow i={b} ba={bids[b]} diff={maxBid} max={minBid} key={`${b}:${bids[b][0]}:${bids[b][1]}`} />,
    );
  }
  for (let a = 0; a < numRowsAsk; a++) {
    resultAsks.unshift(
      <OrderRow i={a} ba={asks[a]} diff={minAsk} max={maxAsk} key={`${a}:${asks[a][0]}:${asks[a][1]}`} />,
    );
  }

  const classes = useStyles();
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="caption table">
          <caption>
            {market}
            {' '}
            Order Book
          </caption>
          <TableHead>
            <TableRow>
              <TableCell align="left">
                {market.toUpperCase()}
                {' '}
                - Order Book
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Bid</TableCell>
              <TableCell>Ask</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resultAsks}
            {resultBids}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

OrderRow.defaultProps = {
  i: '',
  ba: '',
};

OrderRow.propTypes = {
  i: propTypes.number,
  ba: propTypes.arrayOf(propTypes.string),
};

OrderBook.defaultProps = {
  market: '',
  bids: '',
  asks: '',
};

OrderBook.propTypes = {
  market: propTypes.string,
  bids: propTypes.arrayOf(propTypes.arrayOf(
    propTypes.string,
    propTypes.string,
  )),
  asks: propTypes.arrayOf(propTypes.arrayOf(
    propTypes.string,
    propTypes.string,
  )),
};

export default OrderBook;
