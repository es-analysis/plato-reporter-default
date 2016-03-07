import React from 'react';

var TopNav = React.createClass({
  getInitialState: function () {
    return {};
  },
  render: function () {
    return ( 
      <nav className='navbar topnav-navbar navbar-fixed-top' role='navigation'>
        <div className='navbar-header text-center'>
          <a className='navbar-brand' ui-sref='home'>P</a>
        </div>
        <div className="collapse navbar-collapse">
          <p className="navbar-text navbar-left navbar-title">{this.props.title}</p>
          <a className="btn btn-rounded btn-bordered navbar-right btn-primary" style={{'margin': '8px 10px'}} href="http://github.com/es-analysis/plato">Plato on github</a>
          
        </div>

      </nav>

    );
  },

});

export default TopNav;