var express = require("express");
var app = express();
app.use(express.logger());

var pg = require('pg');

pg.defaults.ssl = true;

app.get('/', function(request, response) {
	pg.connect(process.env.DATABASE_URL, function(err, client) {
		if (err) throw err;
		console.log('Connected to postgres! Getting schemas...');

	    var query = client.query("select * from salesforce.Product__c;");
	    query.on("row", function (row, result) { 
	            result.addRow(row.Name__c + '/n'); 
	        });
	    query.on("end", function (result) {          
	            response.send(result.rows);
	        });
	});
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  	console.log("Listening on " + port);
});

