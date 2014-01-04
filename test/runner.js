var expect = require('chai').expect
, chai      = require('chai')
, sinon      = require('sinon')
, sinonChai      = require('sinon-chai')
, should      = require('should')
, rewire = require('rewire');


chai.use(sinonChai);

var Runner = rewire('../lib/runner');

  describe("Runner", function() {

  it("should exists", function(done) {

    var fake_amqp_connection = {exchange: function() {return {}; } };
    var runner = new Runner({}, fake_amqp_connection, {});

    expect(runner).to.not.be.undefined;
    done();
  });

  it("should call setInterval on run", function(done) {

    var fake_amqp_connection = {exchange: function() {return {}; } };
    var runner = new Runner({}, fake_amqp_connection, {});

    var callback = sinon.spy();

    // mocking inside the required module with rewire
    Runner.__set__("setInterval", callback);

    runner.run();

    sinon.assert.calledOnce(callback);

    done();
  });

});