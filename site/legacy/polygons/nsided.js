var p = 8;					// number of points distributed on circle
var n = 4;					// number of points chosen to create an n-sided regular polygon (multiple of p)

var points = [];			// array of integers 0 through p - 1

var locations = [];			// the locations of every available point on the circle

var s;						// size of points for visualization
var delay = 0;

function errMessage() {
	$('#error').text("N must be a multiple of P");
	setTimeout( function() { $('#error').text(""); }, 2000);
}

$(document).ready( function() {
	$('#run').click( function() {
		clearInterval(interval);
		$('#output').text('');
		run();
	});

	$('#end').click( function() {
		clearInterval(interval);
	});

	$('#n').change( function() {
		clearInterval(interval);
		n = parseInt($(this).val(), 10);
		if (n > p || p % n != 0) {
			errMessage();
		}
		init();
		$('#nText').text(n);
	});

	$('#p').change( function() {
		clearInterval(interval);
		p = parseInt($(this).val(), 10);
		if (n > p || p % n != 0) {
			errMessage();
		}
		init();
		$('#pText').text(p);
	});
});

function setup() {
	var canvas = createCanvas(windowWidth, 0.85 * windowHeight);
	canvas.position(0, 0);
	canvas.style('z-index', '-1');
	strokeWeight(2);

	init();
}

function init() {
	// scale size of points based on p
	s = map(p, 1, 500, 10, 2);

	points = [];
	locations = [];

	for (var i = 0; i < p; i++) {
		points.push(i);
	}

	var scale = (height / 2) - 30;
	for (var i = 0; i < 2 * PI; i+= (2 * PI) / p) {
		locations.push(createVector(cos(i) * scale, sin(i) * scale));
	}

	displayLines([0]);
}

// display lines connecting points
function displayLines(indices) {
	background(45);
	push();
	translate(width / 2, height / 2);

	stroke(66, 134, 244);
	for (var i = 0; i < indices.length - 1; i++) {
		line(locations[indices[i]].x, locations[indices[i]].y, locations[indices[i + 1]].x, locations[indices[i + 1]].y)
	}
	line(locations[indices[indices.length - 1]].x, locations[indices[indices.length - 1]].y, locations[indices[0]].x, locations[indices[0]].y)

	stroke(0);
	for (var i = 0; i < locations.length; i++) {
		ellipse(locations[i].x, locations[i].y, s, s);
	}
	pop();
}

// determine if points in pts form a regular polygon
function isRegPolygon(pts) {
	var increment = p / n;		// the required distance between each point to form a regular polygon
	if (pts[0] < pts[1]) {		// if ascending in order
		for (var i = 0; i < pts.length; i++) {
			var next = pts[i] + increment;
			if (next >= p) {
				next %= p;
			}
			var actual = pts[i + 1 == pts.length ? 0 : i + 1];
			if (actual != next) {
				return false;
			}
		}
	} else {					// if descending in order
		for (var i = 0; i < pts.length; i++) {
			var next = pts[i] - increment;
			if (next < 0) {
				next += p;
			}
			var actual = pts[i + 1 == pts.length ? 0 : i + 1];
			if (actual != next) {
				return false;
			}
		}
	}
	return true;
}

// run algorithm
var interval;
function run() {
	// check for errors
	if (n > p || p % n != 0) {
		errMessage();
		n = 4;
		p = 8;
		$('#nText').text(n);
		$('#pText').text(p);
		init();
	}

	var regPolygons = 0.0;
	var total = 0.0;


	interval = setInterval( function() {
		var working = points.slice();

		var attempt = [];

		// get n different, random integer values between 0 and p - 1
		for (var i = 0; i < n; i++) {
			var index = Math.floor(Math.random() * working.length);
			attempt.push(working[index]);
			working.splice(index, 1);
		}

		attempt.sort(function (a, b) {  return a - b;  });

		displayLines(attempt);

		if (isRegPolygon(attempt)) {
			regPolygons++;
		}

		total++;

		// update stats
		$('#total').text("Total Attempts: " + total);
		$('#perc').text("Percentage Regular Polygons: " + ((regPolygons / total) * 100).toFixed(3) + "%");
		$('#percNot').text("Percentage Not Regular Polygons: " + (((total - regPolygons) / total) * 100).toFixed(3) + "%");

		$('#rpolygons').text("Regular Polygons: " + regPolygons);
		$('#nonpolygons').text("Not Regular Polygons: " + (total - regPolygons));

	}, delay);
}