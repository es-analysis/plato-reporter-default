
import React from 'react';
import MenuBar from './MenuBar';

var Sidebar = React.createClass({

  getInitialState: function(){
    return {};
  },

  render: function(){
  
    return ( <aside id="sidebar">
        <div className="sidenav-outer">
          <MenuBar></MenuBar>
        </div>
      </aside>
    );
  }

});

export default Sidebar;