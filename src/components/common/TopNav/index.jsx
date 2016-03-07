import React from 'react';

var TopNav = React.createClass({

  getInitialState: function () {
    return {};
  },

  render: function () {
    return ( <nav className='navbar topnav-navbar navbar-fixed-top' role='navigation'>

        <div className='navbar-header text-center'>
          <button type='button' className='navbar-toggle' onClick={this.showMenu}>
            <span className='sr-only'>Toggle navigation</span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
          </button>
          <a className='navbar-brand' ui-sref='home'>P</a>
        </div>
      </nav>

    );
  },

});

export default TopNav;