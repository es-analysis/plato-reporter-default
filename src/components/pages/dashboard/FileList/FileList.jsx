import React from 'react';
import C3Chart from '../../../common/ChartElement/C3Chart';
import Stats from '../../../common/Stats';
import Translate from '../../../common/Translate';
import { hashHistory } from 'react-router';
import {Panel} from 'react-bootstrap';
import { Link } from 'react-router';

var platoAdapter = require('../../../../plato-adapter');

var Home = React.createClass({
  translateData: function (data) {
    if (!data) return {files: []};

    this.data = data;

    var complexity = data.reports['plato-analyzer-complexity'];

    return {
      files: data.entries
    };
  },
  setData: function (data) {
    this.setState(this.translateData(data));
  },
  componentWillMount: function () {
    platoAdapter.getBatchData().then((res, status) => {
      this.setData(res);
    });
  },
  getInitialState() {
    return this.translateData();
  },
  render: function () {
    let files = this.state.files.map((file)=> {
      console.log(file);
      return <div className="col-lg-12">
        <div className="row">
          <div className="col-sm-1">
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="text-center"><h4>One</h4></div>
              </div>
            </div>
          </div>
          <div className="col-sm-11">
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="text-center"><h4><Link to={"dashboard/report/" + file.id}>{file.file}</Link></h4></div>
              </div>
            </div>
          </div>
        </div>
      </div>;
    });
    console.log(files);
    return (
      <div>
        <div className='conter-wrapper home-container'>
            {files}
        </div>
      </div>

    );
  },
});

export default Home;