var express = require("express");
var app = express();
app.use(express.logger());

var pg = require('pg');

pg.defaults.ssl = true;
pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');

  client
    .query('SELECT * FROM "Salesforce"."Contact"')
    .on('row', function(row) {
      console.log(JSON.stringify(row));
    });
});

app.get('/', function(request, response) {

	response.send('success');
	
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  	console.log("Listening on " + port);
});

