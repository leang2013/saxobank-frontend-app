import { getTickerByTicker } from '../utils';
import { updateMarkets, updateDepth } from '../actions';
import urls from '../config/urls';

export const disconnectSocket = (socket) => {
  if (socket.readyState === WebSocket.OPEN) {
    socket.close();
  }
};

const filteredData = (data) => ({
  ...data,
  a: data.a.filter((item) => !item[1].startsWith('0.0') && item[1] !== '0'),
  b: data.b.filter((item) => !item[1].startsWith('0.0') && item[1] !== '0'),
});

const setupSocket = (dispatch, stream) => {
  const socket = new WebSocket(`${urls.sw}/${stream}`);
  let data;

  socket.onmessage = (event) => {
    const eventName = event.currentTarget.url.split('@')[1];
    switch (eventName) {
      case 'arr':
        data = getTickerByTicker(JSON.parse(event.data));
        dispatch(updateMarkets(data));
        break;
      case 'depth':
        data = filteredData(JSON.parse(event.data));
        dispatch(updateDepth(data));
        break;
      default:
        break;
    }
  };

  socket.onerror = (event) => console.log(event);

  return socket;
};

export default setupSocket;
