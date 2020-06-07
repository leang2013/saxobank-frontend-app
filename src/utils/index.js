export const getTickerByTicker = (data) => {
  const ticker = {};
  data.forEach((item) => {
    const symbol = item.symbol || item.s;
    ticker[symbol] = {
      symbol,
      lastPrice: item.lastPrice || item.c,
      priceChange: item.priceChange || item.p,
      priceChangePercent: item.priceChangePercent || item.P,
      highPrice: item.highPrice || item.h,
      lowPrice: item.lowPrice || item.l,
      quoteVolume: item.quoteVolume || item.q,
    };
  });
  return ticker;
};

export const getStream = () => {
  const pathName = window.location.pathname;
  const page = (pathName.length === 1) ? pathName : pathName.split('/')[1];
  let ticker;
  let result;
  if (pathName.length > 1) {
    ticker = pathName.split('/')[2].toLowerCase();
  }

  switch (page) {
    case '/':
      result = '!ticker@arr';
      break;
    case 'trade':
      result = `${ticker}@depth`;
      break;
    default:
      result = '!ticker@arr';
  }
  return result;
};
