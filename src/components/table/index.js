import React from 'react';
import { Link } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import propTypes from 'prop-types';
import { makeStyles, withStyles} from '@material-ui/core/styles';
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
    minHeight: 100,
    backgroundColor: 'gray',
  },
});


const DataTable = ({ ticker, filter }) => {
  const rows = [];
  const tickerArray = Object.values(ticker);
  const numRows = tickerArray.length;

  for (let i = 0; i < numRows; i++) {
    if (filter.includes(tickerArray[i].symbol)) {
      rows.push({ ...tickerArray[i] });
    }
  }
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="caption table">
        <caption>Markets</caption>
        <TableHead className={classes.head}>
          <TableRow>
            <StyledTableCell>Pair</StyledTableCell>
            <StyledTableCell align="right">Last Price</StyledTableCell>
            <StyledTableCell align="right">24h Change</StyledTableCell>
            <StyledTableCell align="right">24h High</StyledTableCell>
            <StyledTableCell align="right">24h Low</StyledTableCell>
            <StyledTableCell align="right">24h Volume</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.symbol}>
              <Link to={`trade/${row.symbol}`}>
                <StyledTableCell component="th" scope="row">
                  {row.symbol}
                </StyledTableCell>
              </Link>
              <StyledTableCell align="right">{new BigNumber(row.lastPrice).toFormat(null, 1)}</StyledTableCell>
              <StyledTableCell align="right">
                {new BigNumber(row.priceChangePercent).toFormat(2, 1)}
                %
              </StyledTableCell>
              <StyledTableCell align="right">{new BigNumber(row.highPrice).toFormat(null, 1)}</StyledTableCell>
              <StyledTableCell align="right">{new BigNumber(row.lowPrice).toFormat(null, 1)}</StyledTableCell>
              <StyledTableCell align="right">{new BigNumber(row.quoteVolume).toFormat(null, 1)}</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

DataTable.defaultProps = {
  ticker: '',
  filter: '',
};

DataTable.propTypes = {
  ticker: propTypes.object,
  filter: propTypes.array,
};

export default DataTable;
