var express = require("express");
var app = express();
app.use(express.logger());

var pg = require('pg');

pg.defaults.ssl = true;

app.get('/', function(request, response) {
	response.sendfile('index.html');
});

app.get('/getCatalog', function(request, response) {
	pg.connect(process.env.DATABASE_URL, function(err, client) {
		if (err) throw err;
		var query = client.query("select Id, Name, Name__c, Description__c, Amount__c, Cost__c from salesforce.Product__c");
		query.on("row", function (row, result) { 
   	  	    result.addRow(row);
   	    });
   	    query.on("end", function (result) {
   	    	console.log('result ' + result);
   	    	response.send(JSON.stringify(result));
	   	});
	});
});

app.get('/getTotal', function(request, response) {
	pg.connect(process.env.DATABASE_URL, function(err, client) {
		if (err) throw err;
		var query = client.query("select Amount__c, Cost__c from salesforce.Product__c");
		var total = 0;
		query.on("row", function (row, result) { 
   	 	    total += row.amount__c * row.cost__c;
	    });
   	    query.on("end", function (result) {
   	    	console.log('total ' + total);
   	    	response.send(total);
	   	});
	});
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  	console.log("Listening on " + port);
});

