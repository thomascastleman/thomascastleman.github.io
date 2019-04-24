
var sc;				// scale for point positions
var n = 200;		// number of points
var t = 2.0;		// multiplier
var inc = 0.01;		// increment for cycle visualization

function setup() {
	var canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0);
	canvas.style('z-index', '-1');

	stroke(125);

	// scale 
	sc = height / 2 - 30;

	displayLines(n, t);
}

// cycle through multipliers with n points
var interval;
function cycle(n) {
	clearInterval(interval);
	var t = 0;
	interval = setInterval( function() {
		displayLines(n, t);					// display lines
		$('#t').text(t.toFixed(3));			// update text
		t += inc;							// increment multiplier
	}, 0);
}

// display all lines for a given number of points and the multiplication value t
function displayLines(bound, t) {
	background(20);
	push();
	translate(width / 2, height / 2);

	// for every point in circle
	for (var i = 0; i < bound; i++) {

		var prod = i * t;		// calculate product, mod values higher than number of points
		if (prod >= bound) {
			prod %= bound;
		}

		// scale current and product values to 0-2pi
		var from = i * ((2 * PI) / bound);
		var to = prod * ((2 * PI) / bound);

		// get actual positions in circle
		var p1 = {x : cos(from) * sc, y : sin(from) * sc};
		var p2 = {x : cos(to) * sc, y : sin(to) * sc};

		// display line between positions
		line(p1.x, p1.y, p2.x, p2.y);
	}

	pop();

	showPoints(bound);
}

function showPoints(amount) {
	push();
	translate(width / 2, height / 2);
	for (var i = 0; i < 2 * PI; i += (2 * PI) / amount) {
		ellipse(cos(i) * sc, sin(i) * sc, 4, 4);
	}
	pop();
}