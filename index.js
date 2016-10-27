var express = require("express");
var app = express();
app.use(express.logger());

var pg = require('pg');

pg.defaults.ssl = true;

app.get('/', function(request, response) {
	response.sendfile('index.html');
});

app.get('/getProducts', function(request, response) {
	pg.connect(process.env.DATABASE_URL, function(err, client) {
		if (err) throw err;
		var query = client.query("select * from salesforce.Product__c");
		var sum = 0;
   	    query.on("row", function (row, result) { 
	            result.addRow(row);
	        });
   	    response.send(result.rows[0].Name__c);
	});
});


var port = process.env.PORT || 5000;
app.listen(port, function() {
  	console.log("Listening on " + port);
});

