var Twitter = require('twitter');
var expect  = require("chai").expect;
var fs = require('fs')

var config = JSON.parse(fs.readFileSync('./test/properties.json', encoding="ascii"));
var client = new Twitter(config);

describe("Twitter API GET Test", function() {

    it("favorite/list", function(done) {
      client.get('favorites/list', function(error, tweets, response) {
        expect(response.statusCode).to.equal(200);
        var result = JSON.parse(response.body);
        expect(result).to.be.a('array');
        done();
      });
    });

});
