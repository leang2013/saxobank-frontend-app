import React from 'react';
import BigNumber from 'bignumber.js';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import propTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 12,
    color: theme.palette.common.white,
  },
}))(TableCell);

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    minHeight: 500,
    backgroundColor: 'gray',
  },
  row: {
    minHeight: 100,
  },
  head: {
    backgroundColor: 'white',
  },
  price: {
    fontSize: 20,
  },
});

const OrderRow = ({
  i, ba, diff, max, classes
}) => (
  <TableRow className={classes.row} key={`${i}:${ba[0]}:${ba[1]}`}>
    <StyledTableCell>{new BigNumber(ba[0]).toFormat(null, 1)}</StyledTableCell>
    <StyledTableCell>{new BigNumber(ba[1]).toFormat(null, 1)}</StyledTableCell>
  </TableRow>
);

const OrderBook = ({ market, bids, asks }) => {
  const resultBids = [];
  const resultAsks = [];
  const numRowsBid = Math.min(20, bids.length);
  const numRowsAsk = Math.min(20, asks.length);
  const maxBid = BigNumber.maximum(...bids.map((bid) => bid[0])).toFormat();
  const minBid = BigNumber.minimum(...bids.map((bid) => bid[0])).toFormat();
  const minAsk = BigNumber.minimum(...asks.map((ask) => ask[0])).toFormat();
  const maxAsk = BigNumber.maximum(...asks.map((ask) => ask[0])).toFormat();
  const classes = useStyles();

  for (let b = 0; b < numRowsBid; b++) {
    resultBids.push(
      <OrderRow i={b} ba={bids[b]} diff={maxBid} max={minBid} key={`${b}:${bids[b][0]}:${bids[b][1]}`} classes={classes} />,
    );
  }
  for (let a = 0; a < numRowsAsk; a++) {
    resultAsks.unshift(
      <OrderRow i={a} ba={asks[a]} diff={minAsk} max={maxAsk} key={`${a}:${asks[a][0]}:${asks[a][1]}`} classes={classes} />,
    );
  }

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
              <TableCell className={classes.head}>
                {market.toUpperCase()}
                {' '}
                - Order Book
              </TableCell>
              <TableCell className={classes.head} />
            </TableRow>
            <TableRow>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Amount</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resultAsks}
            <TableRow>
              <TableCell className={classes.price} align="center">
                {minAsk}
                {' '}
                -
                {' '}
                {maxBid}
              </TableCell>
            </TableRow>
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
  diff: '',
  max: '',
};

OrderRow.propTypes = {
  i: propTypes.number,
  ba: propTypes.arrayOf(propTypes.string),
  diff: propTypes.number,
  max: propTypes.number,
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
