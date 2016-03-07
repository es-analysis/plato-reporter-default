import NProgress from 'nprogress';
import Report from './Report';

module.exports = {
  path: '/dashboard/report/:reportId',
  getComponent(location, cb) {
    NProgress.start();
    require.ensure([], (require) => {
      NProgress.done();
      cb(null, Report);
    });
  }
};