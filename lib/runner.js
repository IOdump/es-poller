var  elasticsearch = require('elasticsearch')
, fs            = require('fs')
, amqp          = require('amqp');


function Runner(client, conf) {
  this.client = client;
  this.conf = conf;
}

Runner.prototype.run = function () {
  var that = this;
  var connection = amqp.createConnection({ host: '127.0.0.1' });
  
  // Wait for connection to become established.
  connection.on('ready', function () {

    console.log('rabbitmq connected !');

    exchange = connection.exchange('iorealtime');


    setInterval(function() {

      that.client.search({
        index: that.conf.index,
        body: that.conf.query
      }).then(function (resp) {

        console.log(that.conf.topic);

        resp.topic = that.conf.topic;
        resp.meta = that.conf.meta;

        exchange.publish(that.conf.topic, resp);


      }, function (err) {
        console.trace(err.message);

      });
    }, 1000);


  });
}

exports = module.exports = Runner;