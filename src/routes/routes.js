import Home from '../pages/home';
import Trade from '../pages/trade';

export const routes = {
  Home: {
    path: '/',
    exact: true,
    component: Home,
  },
  Trade: {
    path: '/trade/:market',
    exact: true,
    component: Trade,
  },
};
