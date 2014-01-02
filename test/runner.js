var expect = require('chai').expect
, sinon      = require('sinon')
, sinon      = require('should')
, rewire = require('rewire');

var Runner = rewire('../lib/runner');

  describe("Runner", function() {

  it("should exists", function(done) {

    var fake_amqp_connection = {exchange: function() {return {}; } };
    var runner = new Runner({}, fake_amqp_connection, {});

    expect(runner).to.not.be.undefined;
    done();
  });

});