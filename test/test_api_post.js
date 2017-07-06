let Twitter = require('twitter');
let chai = require("chai");
let expect  = chai.expect;
let fs = require('fs');

var config = JSON.parse(fs.readFileSync('./test/properties.json', encoding="ascii"));
var client = new Twitter(config);

var id = '';
describe("Twitter API POST Test", function() {

    it("Status Update New", function(done) {
      client.post('statuses/update', {status: 'hello my 8h'},  function(error, tweet, response) {
        expect(response.statusCode).to.equal(200);
        var result = JSON.parse(response.body);
        id = result.id_str;
        done();
      });
    });

    it("Status Update Duplicate", function(done) {
      client.post('statuses/update', {status: 'hello my 8h'},  function(error, tweet, response) {
        expect(response.statusCode).to.equal(403);
        done();
      });
    });

    it("Status Destroy", function(done) {
      client.post('statuses/destroy', {id: id},  function(error, tweet, response) {
        expect(response.statusCode).to.equal(200);
        var result = JSON.parse(response.body);
        var id2 = result.id_str;
        expect(id2).to.equal(id);
        done();
      });
    });
});
