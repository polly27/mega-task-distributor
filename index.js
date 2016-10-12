var express = require("express");
var app = express();
app.use(express.logger());

var pg = require('pg');

app.get('/', function(request, response) {
	var connectionString = "postgres://fxgvaicejocbqu:dntJNb6sMiK64Pc02lqXnro-PE@" +
	 "ec2-54-75-226-171.eu-west-1.compute.amazonaws.com:5432:/demja59qg5ck8s?ssl=true";

	pg.connect(connectionString, function(err, client, done) {
	   response.send(client);
	});

});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  	console.log("Listening on " + port);
});

