
const translate = {
  batch: function(report) {
    
  },
  report: function(report) {
    
  },
  undefined: function(report) {
    //assume that this has just the basics
    
  }
};

export default function grade(report) {
  var scores = translate[report.type || 'undefined'](report);
  console.log(scores);
  return 'A';
}
