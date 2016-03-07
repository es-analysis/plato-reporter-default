
var $ = require('jquery');

exports.dataPath = '/data';

exports.batchDataPath = exports.dataPath + '/batch.json';

exports.getBatchData = function() {
  return $.getJSON(exports.batchDataPath);
};

exports.getReportData = function(id) {
  return $.getJSON(exports.dataPath + '/' + id + '.json');
};

