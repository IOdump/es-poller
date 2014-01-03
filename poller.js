var  fs            = require('fs')
   , amqp          = require('amqp')
   , elasticsearch = require('elasticsearch')
   , runner        = require('./lib/runner');


// load configuration file
var   conf                 = JSON.parse(fs.readFileSync('./config.js').toString())
    , elasticsearch_client = new elasticsearch.Client(conf.elastic)
    , amqp_connection      = amqp.createConnection(conf.amqp);


var files = fs.readdirSync('./queries.d/');

console.log('waiting for amqp connection');

var booted = false;

amqp_connection.on('ready', function () {
  
  if (booted) {
   return;
  }

  booted = true;
  console.log('amqp connection established.');
 
  for(var i in files) {
    console.log('loading elastic query: ' + files[i]);
 
    var file =  './queries.d/' + files[i];
    var data = JSON.parse(fs.readFileSync(file).toString());
 
    run = new runner(elasticsearch_client, amqp_connection, data);
    run.run();
 
  }

});