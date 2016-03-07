import NProgress from 'nprogress';
import Home from './Home';

import platoAdapter from '../../../../plato-adapter';

module.exports = {
  path: 'dashboard/home',
  getComponent(location, cb) {
    NProgress.start();
    require.ensure([], (require) => {
      platoAdapter.getBatchData().then(function(res, status){
        console.log("HEY I GOT IT");
        Home.batchData = res;
        NProgress.done();
        cb(null, Home);
      });
    });
  }
};