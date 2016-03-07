import React from 'react';
import $ from 'jquery';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Sidebar from '../../common/Sidebar';
import TopNav from '../../common/TopNav';

var Dashboard = React.createClass({
    
  componentWillMount: function() {
    this.setState({Height: $(window).height()});
  },

  componentDidMount: function() {},

  componentWillUnmount: function(){
    $(window).unbind('resize',this.adjustResize);
  },

  getInitialState: function(){
    return {};
  },
  
  render: function() {
    const { pathname } = this.props.location;
    
    return (
        <div className="dashboard-page">
          <TopNav title="Source Analysis"/>
          <Sidebar />
          <ReactCSSTransitionGroup component="div"
                               transitionName="ng"
                               transitionEnterTimeout={500}
                               transitionLeaveTimeout={300}
          >
            {React.cloneElement(<section id="body-container" className="ui-view">{this.props.children}</section> || <div />, { key: pathname })}
          </ReactCSSTransitionGroup>
        </div>
    );
  },
  statics: {
    fetchData: function(params) {}
  }
  
});

export default Dashboard;
