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
  i, ba, classes,
}) => (
  <TableRow className={classes.row} key={`${i}:${ba[0]}:${ba[1]}`}>
    <StyledTableCell>{new BigNumber(ba[0]).toFormat(null, 1)}</StyledTableCell>
    <StyledTableCell>{new BigNumber(ba[1]).toFormat(null, 1)}</StyledTableCell>
    <StyledTableCell>{new BigNumber(ba[0]).multipliedBy(ba[1]).toFormat(2)}</StyledTableCell>
  </TableRow>
);

const OrderBook = ({ market, bids, asks }) => {
  const resultBids = [];
  const resultAsks = [];
  const numRowsBid = Math.min(20, bids.length);
  const numRowsAsk = Math.min(20, asks.length);
  const minBid = BigNumber.minimum(...bids.map((bid) => bid[0])).toFormat();
  const minAsk = BigNumber.minimum(...asks.map((ask) => ask[0])).toFormat();
  let spread = 0;
  const isMiles = minAsk.includes(',');

  if (isMiles) {
    const numBid = `0.${minBid.split(',')[1].split('.')[0]}`;
    const numAsk = `0.${minAsk.split(',')[1].split('.')[0]}`;
    spread = BigNumber(numAsk).minus(numBid).toFormat();
    spread *= 1000;
  } else {
    spread = BigNumber(minAsk).minus(minBid).toFormat();
  }

  const classes = useStyles();

  for (let b = 0; b < numRowsBid; b++) {
    resultBids.push(
      <OrderRow i={b} ba={bids[b]} key={`${b}:${bids[b][0]}:${bids[b][1]}`} classes={classes} />,
    );
  }
  for (let a = 0; a < numRowsAsk; a++) {
    resultAsks.unshift(
      <OrderRow i={a} ba={asks[a]} key={`${a}:${asks[a][0]}:${asks[a][1]}`} classes={classes} />,
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
              <TableCell className={classes.head} />
            </TableRow>
            <TableRow>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Amount</StyledTableCell>
              <StyledTableCell>Total</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resultAsks}
            <TableRow>
              <TableCell />
              <TableCell className={classes.price}>
                {minAsk}
                {' '}
                -
                {' '}
                {minBid}
                {' '}
                -
                Spread
                {' '}
                {spread}
              </TableCell>
              <TableCell />
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
  classes: null,
};

OrderRow.propTypes = {
  i: propTypes.number,
  ba: propTypes.arrayOf(propTypes.string),
  classes: propTypes.object,
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
