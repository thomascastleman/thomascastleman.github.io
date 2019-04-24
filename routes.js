
/*
	routes.js: System routes
*/

module.exports = {
	init: function(app) {

		// main page
		app.get('/', (req, res) => {
			res.render('homepage/homepage.html');
		});

	}
}