var  elasticsearch = require('elasticsearch')
, fs            = require('fs')
, amqp          = require('amqp')
, runner        = require('./lib/runner');




var client = new elasticsearch.Client({
  host: 'localhost:9210'
});

// load confs
var confs = [];

var files = fs.readdirSync('./conf.d/');
for(var i in files) {
  console.log('conf Loaded: ' + files[i]);
  confs.push(files[i]);
}



  // run all
  for(var i in confs) {

    // run
    var file =  './conf.d/' + confs[i];
    var data = JSON.parse(fs.readFileSync(file).toString());

    // run each 
    run = new runner(client, data);
    run.run();

  }

