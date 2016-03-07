import React from 'react';
//React;

import pathseg from './pathseg';
import { render } from 'react-dom';
import { Router, hashHistory } from 'react-router';
import './common/styles/app-base.less';
import NProgress from 'nprogress';

NProgress.configure({showSpinner: false});

var path = window.location.hash.substr(1);

console.log(hashHistory);

if (path.length == 0 || path.length == 1) {
  path = '/dashboard/home';
  hashHistory.push(path);
}

const rootRoute = {
  path: '/',
  component: require('./components/layouts/Base').default,
  indexRoute: {
    component: require('./components/layouts/Dashboard').default,
  },
  childRoutes: [{
    component: require('./components/layouts/Dashboard').default,
    childRoutes: [
      require('./components/pages/dashboard/Home'),
      require('./components/pages/dashboard/Report'),
    ]
  }]
};

render(
  <Router history={hashHistory} routes={rootRoute}/>,
  document.getElementById('app')
);
