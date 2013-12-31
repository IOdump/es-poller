var  elasticsearch = require('elasticsearch')
   , fs            = require('fs')
   , amqp          = require('amqp');


var connection = amqp.createConnection({ host: '127.0.0.1' });


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


// Wait for connection to become established.
connection.on('ready', function () {

  console.log('rabbitmq connected !');

  exchange = connection.exchange('iorealtime');

  // run all
  for(var i in confs) {
  
    // run
    var file =  './conf.d/' + confs[i];
    var data = JSON.parse(fs.readFileSync(file).toString());
    var index = data.index;
    var query = data.query;
    var topic = data.topic; 
  
  
    // run each 
    setInterval(function() {
  
        client.search({
          index: index,
          body: query
        }).then(function (resp) {
      
          console.log(resp);
          exchange.publish(topic, resp);
          // send 
  
  
        }, function (err) {
          console.trace(err.message);
      
        });
      }, 1000);
  }


});