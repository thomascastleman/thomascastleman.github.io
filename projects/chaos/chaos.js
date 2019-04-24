
var n = 4;					// number of vertices
var vertices = [];			// array of n vertices
var fraction = 1 / 2;		// the percentage of distance between the current point and chosen vertex at which a new point is drawn
var placesAway = [0];		// designates that a chosen position cannot be n places away from a previous position
var lookBehind = 1;			// how many previous positions are recorded (lookBehind of 0 --> no restrictions)

var sp = 1000;				// points per second

function setup() {
	var canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0);
	canvas.style('z-index', '-1');
	background(130);
	fill(0);

	calcVertexPositions();
	
	push();
	translate(width / 2, height / 2);
	for (var i = 0; i < vertices.length; i++) {
		ellipse(vertices[i].x, vertices[i].y, 5, 5);
		// stroke(0);
		// line(vertices[i].x, vertices[i].y, vertices[i + 1 >= vertices.length ? 0 : i + 1].x, vertices[i + 1 >= vertices.length ? 0 : i + 1].y);
	}
	pop();

	noStroke();
}

var interval;
// run at a given number of calculations per frame
function run(speed) {
	clearInterval(interval);

	var current = {x : 0, y : 0};	// choose random initial point
	var available, chosenVertex;
	var restricted = [];

	var previousVertices = [];

	interval = setInterval( function() {

		for (var s = 0; s < speed; s++) {

			push();
			translate(width / 2, height / 2);
			ellipse(current.x, current.y, 1, 1);		// display point
			pop();

			available = vertices.slice();	// get copy of vertices

			// remove all in restricted from available vertices
			for (var i = 0; i < restricted.length; i++) {
				available.splice(available.indexOf(restricted[i]), 1);
			}

			chosenVertex = available[Math.floor(Math.random() * available.length)];		// get random vertex

			// record previous positions
			if (previousVertices.length == lookBehind) {
				previousVertices.shift();
			}
			previousVertices.push(chosenVertex);

			current = getPosBetween(current, chosenVertex, fraction);	// get new point between current and chosen

			// if restrictions apply, update restrictions
			if (lookBehind > 0) {
				restricted = updateRestricted(previousVertices, placesAway);
			}

		}

	}, 0);
}

function stop() {
	clearInterval(interval);
}

// calculate positions for n vertices
function calcVertexPositions() {
	vertices = [];
	var scale = height / 2 - 30;
	for (var i = 0; i < 2 * PI; i += (2 * PI) / n) {
		vertices.push({x : cos(i) * scale, y : sin(i) * scale});
	}
}

// get position between two points given any fraction
function getPosBetween(from, to, frac) {
	var xDif = abs(from.x - to.x);
	var yDif = abs(from.y - to.y);

	// calculate intermediate position
	var mid = {};
	mid.x = from.x + ((from.x < to.x ? 1 : -1) * (frac * xDif));
	mid.y = from.y + ((from.y < to.y ? 1 : -1) * (frac * yDif));

	return mid;
}

// return an array of unavailable positions based on placesAway
function updateRestricted(previous, places) {
	var r = [];

	if (previous.length == places.length) {
		for (var i = 0; i < previous.length; i++) {
			var restrictedPosition = getNPlacesFromPos(previous[i], places[i]);
			// if position not already included
			if (!r.includes(restrictedPosition)) {
				r.push(restrictedPosition);
			}
		}
	} else if (places.length == 1) {
		for (var i = 0; i < previous.length; i++) {
			var restrictedPosition = getNPlacesFromPos(previous[i], places[0]);
			// if position not already included
			if (!r.includes(restrictedPosition)) {
				r.push(restrictedPosition);
			}
		} 
	} else {
		console.log("ERROR UPDATING RESTRICTED");
	}

	return r;
}

// return a position n places counterclockwise from the given position
function getNPlacesFromPos(pos, n) {
	var ind = vertices.indexOf(pos);
	if (ind - n < 0) {
		return vertices[vertices.length - (n - ind)];
	} else {
		return vertices[ind - n];
	}
}