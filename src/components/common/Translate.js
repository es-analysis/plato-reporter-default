
var Translate = {

  getWord: function(wordKey){
    var languageObject = require('json!../../../languages/en.json');
    return languageObject[wordKey];
  }

};

export default Translate;