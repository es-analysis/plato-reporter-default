import NProgress from 'nprogress';
import FileList from './FileList';

import platoAdapter from '../../../../plato-adapter';

module.exports = {
  path: 'dashboard/list',
  getComponent(location, cb) {
    NProgress.start();
    require.ensure([], (require) => {
      NProgress.done();
      cb(null, FileList);
    });
  }
};