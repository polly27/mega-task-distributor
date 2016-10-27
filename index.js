var express = require("express");
var app = express();
app.use(express.logger());

var pg = require('pg');

pg.defaults.ssl = true;

app.get('/', function(request, response) {
	response.sendfile('index.html');
	pg.connect(process.env.DATABASE_URL, function(err, client) {
		if (err) throw err;
		console.log('Connected to postgres! Getting schemas...');

	    var query = client.query("select Name, Name__c, Description__c, Amount__c, Cost__c from salesforce.Product__c;");
	    query.on("row", function (row, result) { 
	            result.addRow(row); 
	        });
	    query.on("end", function (result) {          
	            response.send(result.rows);
	        });

	    response.sendfile('index.html');
	});
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  	console.log("Listening on " + port);
});

