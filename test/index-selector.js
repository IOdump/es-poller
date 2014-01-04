var expect = require('chai').expect
, sinon      = require('sinon')
, sinon      = require('should')
, rewire = require('rewire');

var IndexSelector = rewire('../lib/index-selector');

  describe("Runner", function() {

  it("should exists", function(done) {

    var selector = new IndexSelector();

    expect(selector).to.not.be.undefined;
    done();
  });

});