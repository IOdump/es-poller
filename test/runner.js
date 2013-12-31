var expect = require('chai').expect
, sinon      = require('sinon')
, sinon      = require('should')
, rewire = require('rewire');

var Runner = rewire('../lib/runner');


describe("Runner", function() {

  it("should exists", function(done) {
    var runner = new Runner();
    expect(runner).to.not.be.undefined;
    done();
  });

});