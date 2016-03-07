import React from 'react';
import {Panel, Table} from 'react-bootstrap';

import platoAdapter from '../../../../plato-adapter';

function findReport(array, reportName) {
  let report = array.filter(o => o.analyzer === reportName);
  return report[0] && report[0].result;
}

var Tables = React.createClass({
  translateData: function (data) {
    if (!data) return {
      file: '',
      lintErrors: [],
      complexity: {
        maintainability: 0,
        lloc: 0,
        difficulty: 0,
        errors: 0
      } 
    };

    let lintReport = findReport(data.reports.data, 'plato-analyzer-eslint');
    let complexityReport = findReport(data.reports.data, 'plato-analyzer-complexity');

    return {
      file: data.reports.file,
      lintErrors: lintReport.messages,
      complexity: {
        maintainability: complexityReport.average.maintainability.toFixed(2),
        lloc: complexityReport.total.lloc,
        difficulty: complexityReport.total.difficulty.toFixed(2),
        errors: complexityReport.total.bugs.toFixed(2)
      }
    };
  },
  setData: function (data) {
    this.setState(this.translateData(data));
  },
  componentWillMount() {
    platoAdapter.getReportData(this.props.params.reportId).then((res, status) => {
      this.setData(res);
    });
  },
  getInitialState() {
    return this.translateData();
  },
  render() {

    let lintErrors = this.state.lintErrors.map((message)=> {
      let severity = message.severity === 2 ? 'Error' : 'Warning';
      let messageParts = [
        message.source.substr(0, message.column - 1),
        message.source.substr(message.column - 1, 1),
        message.source.substr(message.column),
      ];
      console.log(message.source);
      console.log(message.column);
      console.log(messageParts);
      let source = (
        <span>{messageParts[0]}
          <span className="report-lint-sourceCode-highlight">{messageParts[1]}</span>
          {messageParts[2]}
        </span>);
      return (
        <tr className={'report-lint report-lint-' + severity}>
          <td>{severity}</td>
          <td>{message.line}:{message.column}</td>
          <td className="report-lint-sourceCode">
            <pre><code>{source}</code></pre>
          </td>
        </tr>
      )
    });

    return (
      <div>
        <pageheader pagename="File Report" subtitle={this.state.file}></pageheader>
        <div className="conter-wrapper">
            <div className="row">
              <Panel header={<span>Complexity</span>} bsStyle="info">
                <div className="row">
                  <div className="col-md-6 report-complexity-stats">
                    <h3>Average Maintainability</h3>
                    <p>{this.state.complexity.maintainability}</p>
                  </div>
                  <div className="col-md-6 report-complexity-stats">
                    <h3>Logical Lines of Code</h3>
                    <p>{this.state.complexity.lloc}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 report-complexity-stats">
                    <h3>Total Difficulty</h3>
                    <p>{this.state.complexity.difficulty}</p>
                  </div>
                  <div className="col-md-6 report-complexity-stats">
                    <h3>Estimated Number of Errors</h3>
                    <p>{this.state.complexity.errors}</p>
                  </div>
                </div>
              </Panel>
            </div>

            <div className="row">
              <Panel header={<span>Lint Errors</span>} bsStyle="info">
                <div className="col-lg-12">
                  <Table>
                    <thead>
                    <tr>
                      <th>Severity</th>
                      <th>Line</th>
                      <th>Source</th>
                    </tr>
                    </thead>
                    <tbody>
                    {lintErrors}
                    </tbody>
                  </Table>
                </div>
              </Panel>
            </div>
        </div>
      </div>

    );
  }

});

export default Tables;