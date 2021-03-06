import NProgress from 'nprogress';
import Home from './Home';

import platoAdapter from '../../../../plato-adapter';

module.exports = {
  path: 'dashboard/home',
  getComponent(location, cb) {
    NProgress.start();
    require.ensure([], (require) => {
      NProgress.done();
      cb(null, Home);
    });
  }
};