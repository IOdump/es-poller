var  elasticsearch = require('elasticsearch')
   , fs            = require('fs');

var client = new elasticsearch.Client({
  host: 'localhost:9210'
});


var file = __dirname + '/query.json';
var data = fs.readFileSync(file).toString();
var query = JSON.parse(data);


client.search({
  index: 'logstash-2013.12.30',
  body: query
}).then(function (resp) {

  console.log(resp);

}, function (err) {
  console.trace(err.message);

});