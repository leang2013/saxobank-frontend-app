import { getTickerByTicker } from '../utils';
import { updateMarkets, updateDepth } from '../actions';
import urls from '../config/urls';

export const disconnectSocket = (socket) => {
  if (socket.readyState === WebSocket.OPEN) {
    socket.close();
  }
};

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
        data = JSON.parse(event.data);
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
