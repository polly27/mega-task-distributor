var express = require("express");
var app = express();
app.use(express.logger());

const pg = require('pg');

const connectionString = "postgres://fxgvaicejocbqu:dntJNb6sMiK64Pc02lqXnro-PE@" +
	 "ec2-54-75-226-171.eu-west-1.compute.amazonaws.com:5432/demja59qg5ck8s";

app.get('/', function(request, response) {
	const client = new pg.Client(connectionString);
	client.connect();

	pg.connect(connectionString, function(err, client, done) {
	   response.send(client);
	   client.query('SELECT * FROM Contact', function(err, result) {
	      done();
	      if(err) return console.error(err);
	      console.log(result.rows);
	      response.send(result.rows);
	   });
	});

});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  	console.log("Listening on " + port);
});

