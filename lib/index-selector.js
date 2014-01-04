var dateFormat = require('dateformat');

function IndexSelector() {
  this.index_base =  'logstash-';
}

IndexSelector.prototype.latest = function() {

    var now = new Date();
    expected = 'logstash-' + dateFormat(now, 'yyyy.mm.dd');
    return expected;
}

exports = module.exports = IndexSelector;