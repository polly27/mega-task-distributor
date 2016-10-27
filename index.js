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
		var query = client.query("select Id, Name, Name__c, Description__c, Amount__c, Cost__c from salesforce.Product__c");
		var total = 0;
		console.log("total " + total);
   	    query.on("row", function (row, result) { 
   	    	    result.addRow(row);
   	    	    total += row.amount__c * row.cost__c;
   	    	    console.log("total " + total + ", amount " + row.amount__c + ", cost " + row.cost__c);    
	        });
   	    query.on("end", function (result) {
   	    	console.log(JSON.stringify(result.rows, null, "	   ") + "/n");
   	    	console.log(total);
   	    	response.send(JSON.stringify(result.rows));
	   	});
	});
});


var port = process.env.PORT || 5000;
app.listen(port, function() {
  	console.log("Listening on " + port);
});

