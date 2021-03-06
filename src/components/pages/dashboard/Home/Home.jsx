import React from 'react';
import C3Chart from '../../../common/ChartElement/C3Chart';
import Stats from '../../../common/Stats';
import Translate from '../../../common/Translate';
import { hashHistory } from 'react-router';
import {Panel} from 'react-bootstrap';
import grading from '../../../../grading';

var platoAdapter = require('../../../../plato-adapter');

var Home = React.createClass({
  getChartOptions: function (color, max) {
    var a = this;
    console.log(this);
    
    return {
      padding: {
        top: 20,
        bottom: 20
      },
      size: {
        height: 300
      },
      axis: {
        y: {
          max: max || undefined,
        },
        x: {
          height: 50,
          tick:{
            rotate:45,
          }
        }
      },
      showLegend: false,
      color: color || '#de5b57',
      onClick: (d) => {
        let index = d.index;
        let reportId = this.data.entries[index].id;
        hashHistory.push(`/dashboard/report/${reportId}`);
      }
    }
  },
  
  
  translateData: function(data) {
    if (!data) return {
      totals: {
        lloc: [{key: '',values: []}],
        complexity: [{key: '',values: []}],
        maintainability: [{key: '',values: []}],
      },
      individualStats: [
        {
          text: Translate.getWord('stats.maxMaintainability') + ` : ...`,
          class: this.getClass(),
          value: 0,
        },
        {
          text: Translate.getWord('stats.maxCyclomatic') + ` : ...`,
          class: this.getClass(),
          value: 0,
        },
        {
          text: Translate.getWord('stats.maxLloc') + ` : ...`,
          class: this.getClass(),
          value: 0,
        },
        {
          text: Translate.getWord('stats.MaxDifficulty') + ` : ...`,
          class: this.getClass(),
          value: 0,
        },
      ]
    };
    
    this.data = data;
    
    function findReportId(file) {
      return data.entries.filter(entry => entry.file === file)[0].id;
    }

    var complexity = data.reports['plato-analyzer-complexity'];

    return {
      grade: grading(data),
      totals: {
        lloc: [
          {
            key: 'lloc',
            values: complexity.each.map(function (fileReport) {
              return {
                label: fileReport.file,
                value: fileReport.total.lloc
              }
            })
          },
        ],
        complexity: [
          {
            key: 'complexity',
            values: complexity.each.map(function (fileReport) {
              return {
                label: fileReport.file,
                value: fileReport.total.cyclomatic
              }
            })
          },
        ],
        maintainability: [
          {
            key: 'maintainability',
            values: complexity.each.map(function (fileReport) {
              console.log(fileReport);
              return {
                label: fileReport.file,
                value: fileReport.average.maintainability.toFixed(1)
              }
            })
          }

        ]
      },
      individualStats: [
        {
          text: Translate.getWord('stats.minMaintainability') + ' : ' + complexity.min.average.maintainability.file,
          class: this.getClass(),
          value: complexity.min.average.maintainability.value.toFixed(2),
          reportId: findReportId(complexity.min.average.maintainability.file) 
        },
        {
          text: Translate.getWord('stats.maxCyclomatic') + ' : ' + complexity.max.total.cyclomatic.file,
          class: this.getClass(),
          value: complexity.max.total.cyclomatic.value,
          reportId: findReportId(complexity.min.total.cyclomatic.file)
        },
        {
          text: Translate.getWord('stats.maxLloc') + ' : ' + complexity.max.total.lloc.file,
          class: this.getClass(),
          value: complexity.max.total.lloc.value,
          reportId: findReportId(complexity.min.total.lloc.file)
        },
        {
          text: Translate.getWord('stats.maxDifficulty') + ' : ' + complexity.max.total.difficulty.file,
          class: this.getClass(),
          value: complexity.max.total.difficulty.value.toFixed(2),
          reportId: findReportId(complexity.min.total.difficulty.file)
        },
      ]
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
  getClass: function (actual = 0, limit = 100, op = '>') {
    let comparisons = {
      '>': (actual, limit) => actual > limit,
      '>=': (actual, limit) => actual >= limit,
      '<': (actual, limit) => actual < limit,
      '<=': (actual, limit) => actual <= limit,
    };
    return comparisons[op](actual, limit);
  },
  getInitialState() {
    return this.translateData();
  },
  render: function () {
    let stats = this.state.individualStats.map(function (stat) {
      return <div className='col-md-6 col-lg-6'><Stats icon="cloud-upload"
                    value={stat.value + '%'}
                    text={stat.text}
                    link={`/dashboard/report/${stat.reportId}`}
                    progressValue="{stat.value}"
      /></div>;
    });
    
    return (
      <div>
        <div className='conter-wrapper home-container'>
          <div className='row home-row'>
              {stats}
          </div>
          <div className='row home-row'>
            <div className='col-md-12 col-lg-12'>
              <Panel header={<span>{Translate.getWord('maintainability')}</span>} bsStyle="primary">
                <C3Chart data={this.state.totals.maintainability} type={'bar'} options={this.getChartOptions('#E91E63', 100)} value={4}/>
              </Panel>
            </div>
          </div>
          <div className='row home-row'>
            <div className='col-md-12 col-lg-12'>
              <Panel header={<span>{Translate.getWord('logicalLinesOfCode')}</span>} bsStyle="primary">
                <C3Chart data={this.state.totals.lloc} type={'bar'} options={this.getChartOptions('#3F51B5')} value={3}/>
              </Panel>
            </div>
          </div>
          <div className='row home-row'>
            <div className='col-md-12 col-lg-12'>
              <Panel header={<span>{Translate.getWord('cyclomaticComplexity')}</span>} bsStyle="primary">
                <C3Chart data={this.state.totals.complexity} type={'bar'} options={this.getChartOptions('#00BCD4')} value={2}/>
              </Panel>
            </div>
          </div>
        </div>
      </div>
      
    );
  },
});

export default Home;