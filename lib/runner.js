var   fs             = require('fs')
    , amqp           = require('amqp')
    , index_selector = require('./index-selector');

function Runner(elasticsearch_client, amqp_connection, query) {
  this.client = elasticsearch_client;
  this.amqp_connection = amqp_connection;
  this.query = query;

  this.exchange = amqp_connection.exchange('realtime');
}

Runner.prototype.run = function () {
  var that = this;

  setInterval(function() {
    that.poll();
  }, 1000);

}

Runner.prototype.poll = function () {
  var that = this;
  var selector = new index_selector();

  that.client.search({
    index: selector.latest(),
    body: that.query.query
  }).then(function (resp) {

    resp.topic = that.query.topic;
    resp.meta = that.query.meta;



    // console.log(that.query.topic);
    that.exchange.publish(that.query.topic, resp);


  }, function (err) {
    console.trace(err.message);

  });
}

exports = module.exports = Runner;