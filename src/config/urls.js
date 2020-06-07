const urls = {
  sw: 'wss://fstream.binance.com/ws',
  getMarkets: 'https://api.binance.com/api/v3/ticker/24hr',
  getDepth: (symbol) => (`https://api.binance.com/api/v3/depth?symbol=${symbol}&limit=1000`),
};

export default urls;
