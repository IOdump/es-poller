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


  it("should select latest logstash index", function(done) {

    var selector = new IndexSelector();
    
    // logstash-2014.01.03  == expected example 

    var dateFormat = require('dateformat');
    var now = new Date();
    var expected = 'logstash-' + dateFormat(now, 'yyyy.mm.dd');


    var index = selector.latest();
    
    expect(index).to.be.expected;

    done();
  });

});