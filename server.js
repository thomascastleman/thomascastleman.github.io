
var express 			= require('express');
var app 				= express();
var mustacheExpress 	= require('mustache-express');
var bodyParser 			= require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.engine('html', mustacheExpress());
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

var sys = require('./settings.js');
var routes = require('./routes.js').init(app);

// start server
var server = app.listen(sys.PORT, function() {
	console.log('tcastleman.com server listening on port %d', server.address().port);
});