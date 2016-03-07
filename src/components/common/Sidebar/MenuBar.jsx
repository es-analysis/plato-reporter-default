import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

var MenuBar = React.createClass({

  getInitialState: function () {
    return {};
  },

  render: function () {
    return (
      <div className='side-menu'>
        <div className='menu-body'>
          <ul className='nav nav-pills nav-stacked sidenav'>
            <li className={classNames({'active': this.state.home})}>
              <Link to='/dashboard/home'>
                <span className='fa fa-home'></span>
              </Link>
            </li>
            <li className={classNames({'active': this.state.report})}>
              <Link to='/dashboard/list'>
                <span className='fa fa-list'></span>
              </Link>
            </li>
            <li className={classNames({'active': this.state.charts})}>
              <Link to='/dashboard/chartjs'>
                <span className='fa fa-bar-chart'></span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  },

});

export default MenuBar;