
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

var PORT = 8080;	// server port

// render main page at / directory, everything else is served statically automatically
app.get('/', (req, res) => {
	res.render('homepage/homepage.html');
});

// redirect all unhandled GETs to /
app.get('*', (req, res) => {
	res.redirect('/');
});

// start server
var server = app.listen(PORT, function() {
	console.log('tcastleman.com server listening on port %d', server.address().port);
});