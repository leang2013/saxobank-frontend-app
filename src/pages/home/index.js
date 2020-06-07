import React from 'react';
import { connect } from 'react-redux';
import propTypes, { func } from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import Table from '../../components/table';
import Loading from '../../components/loading';
import { setFilterMarket } from '../../actions';

const Home = ({ isLoaded, markets, setFilterMarketPairs }) => {
  const [valueTab, setValueTab] = React.useState(0);
  const marketPairs = markets.result;
  const marketPairsFiltered = markets.resultFiltered;


  const handleTabClick = (e) => {
    const market = e.target.innerText;
    const { id } = e.currentTarget;

    setFilterMarketPairs(market);
    setValueTab(parseInt(id, 10));
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }));

  const classes = useStyles();

  return (
    <>
      { (!isLoaded) && <Loading /> }
      {isLoaded
                    && (
                    <Paper className={classes.root}>
                      <Tabs
                        value={valueTab}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleTabClick}
                        aria-label="Markets"
                        centered
                      >
                        <Tab id={0} label="BTCUSDT" />
                        <Tab id={1} label="ETHUSDT" />
                        <Tab id={2} label="XRPUSDT" />
                        <Tab id={3} label="EOSUSDT" />
                        <Tab id={4} label="LTCUSDT" />
                        <Tab id={5} label="ETCUSDT" />
                        <Tab id={6} label="BNBUSDT" />
                        <Tab id={7} label="VETUSDT" />
                      </Tabs>
                    </Paper>
                    )}
      {marketPairs
      && marketPairsFiltered
        ? <Table ticker={marketPairs} filter={marketPairsFiltered} /> : <Loading />}
    </>
  );
};

const mapStateToProps = (state) => ({
  isLoaded: state.saxoBank.homeState.isLoaded,
  markets: state.saxoBank.homeState.markets,
});

const mapDispacthProps = (dispatch) => ({
  setFilterMarketPairs: (data) => dispatch(setFilterMarket(data)),
});

Home.defaultProps = {
  isLoaded: false,
  markets: '',
  setFilterMarketPairs: func,
};

Home.propTypes = {
  isLoaded: propTypes.bool,
  markets: propTypes.object,
  setFilterMarketPairs: propTypes.func,
};

export default connect(mapStateToProps, mapDispacthProps)(Home);
