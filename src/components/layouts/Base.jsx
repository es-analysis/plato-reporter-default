import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

var Base = React.createClass({

  componentWillMount: function () {
    // this.props.history.pushState(null, '/dashboard/home');
  },

  render: function () {

    const { pathname } = this.props.location;

    // var urlPath = window.location.hash.substr(2);
    // if(pathname != urlPath)
    //   this.props.history.pushState(null, urlPath);
    
    let change = pathname;
    if (pathname.substr(0, 10) == 'dashboard/') change = 'internal';

    return (
      <div className="ui-view">
        <div className="ui-base">
          {<ReactCSSTransitionGroup component="div"
                                    transitionName="ng"
                                    transitionEnterTimeout={500}
                                    transitionLeaveTimeout={300}
          >
            {React.cloneElement(<div className="ui-view">{this.props.children}</div> || <div />, {key: change})}
          </ReactCSSTransitionGroup>}

        </div>
      </div>
    );
  }

});

export default Base;