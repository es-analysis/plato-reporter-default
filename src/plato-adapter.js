
var $ = require('jquery');

exports.dataPath = '/data';

exports.batchDataPath = exports.dataPath + '/batch.json';

const cache = {
  
};

exports.getBatchData = function() {
  if (cache.batch) return cache.batch;
  return cache.batch = $.getJSON(exports.batchDataPath);
};

exports.getReportData = function(id) {
  if (cache[id]) return cache[id];
  return cache[id] = $.getJSON(exports.dataPath + '/' + id + '.json');
};

