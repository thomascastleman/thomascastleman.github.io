var points = [1, 2, 3, 4, 5, 6, 7, 8];
var four = [];
var squareCount;
var total;

var locations = [];

var pseudoSquares = false;
var delay = 0;

$(document).ready( function() {
	$('#run').click( function() {
		clearInterval(interval);
		$('#output').text('');
		run();
	});

	$('#end').click( function() {
		clearInterval(interval);
	});
});


function setup() {
	var canvas = createCanvas(0.7 * windowWidth, 0.65 * windowHeight);
	canvas.position(windowWidth / 4, 20);
	canvas.style('z-index', '-1');
	rectMode(CORNERS);
	strokeWeight(2);


	var scale = (height / 2) - 25;
	for (var i = 0; i < 2 * PI; i+= PI / 4) {
		locations.push(createVector(cos(i) * scale, sin(i) * scale));
	}

	displayLines([0]);
}

// display lines connecting points
function displayLines(indices) {
	background(45);
	push();
	translate(width / 4, height / 2);

	stroke(66, 134, 244);
	for (var i = 0; i < indices.length - 1; i++) {
		line(locations[indices[i]].x, locations[indices[i]].y, locations[indices[i + 1]].x, locations[indices[i + 1]].y)
	}
	line(locations[indices[indices.length - 1]].x, locations[indices[indices.length - 1]].y, locations[indices[0]].x, locations[indices[0]].y)

	stroke(0);
	for (var i = 0; i < locations.length; i++) {
		ellipse(locations[i].x, locations[i].y, 25, 25);
	}
	pop();
}

// display bar graph
function displayGraph() {
	push();
	translate(3 * (width / 4), 0);
	fill(0, 255, 0);
	var topleft = height - map(squareCount, 0, total, 0, height);
	rect(-(width / 8), topleft, 0, height);

	var nonSq = total - squareCount;
	fill(255, 0, 0);
	topleft = height - map(nonSq, 0, total, 0, height);
	rect((width / 8), topleft, 0, height);
	pop();
}

// determine if four points form actual square
function isSquare(fourpoints) {
	// if ascending in order
	if (fourpoints[0] < fourpoints[1]) {
		for (var i = 0; i < fourpoints.length - 1; i++) {
			var next = fourpoints[i] + 2;
			if (next > 8) {
				next %= 8;
			}
			var actual = fourpoints[i + 1 == fourpoints.length ? 0 : i + 1];
			if (actual != next) {
				return false;
			}
		}
	// if descending in order
	} else {
		for (var i = 0; i < fourpoints.length - 1; i++) {
			var next = fourpoints[i] - 2;
			if (next <= 0) {
				next += 8;
			}
			var actual = fourpoints[i + 1 == fourpoints.length ? 0 : i + 1];
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
	squareCount = 0.0;
	total = 0.0;

	interval = setInterval( function() {
		var working = points.slice();
		four = [];

		// get four different, random integer values between 1 and 8
		for (var i = 0; i < 4; i++) {
			var index = Math.floor(Math.random() * working.length);
			four.push(working[index]);
			working.splice(index, 1);
		}

		displayLines([points.indexOf(four[0]), points.indexOf(four[1]), points.indexOf(four[2]), points.indexOf(four[3])]);

		// pseudo-square: four points that are two apart, though can be in any order (thus, while a square could be drawn through these points, the shape created is not necessarily a square)
		if (pseudoSquares) {
			// if sum of mods is 0, all are even, hence square
			// if all mods are not 0, all are odd, hence square
			if (((four[0] % 2) + (four[1] % 2) + (four[2] % 2) + (four[3] % 2)) == 0 || ((four[0] % 2 != 0) && (four[1] % 2 != 0) && (four[2] % 2 != 0) && (four[3] % 2 != 0)))  {
				squareCount++;
				$('#output').append("<div class='Sq'>Attempt " + total + ": Square</div>");
			} else {
				$('#output').append("<div class='notSq'>Attempt " + total + ": Not Square</div>");
			}
		// restrict squares to explicit square shapes (check order of points with isSquare())
		} else {
			if (isSquare(four)) {
				squareCount++;
				$('#output').append("<div class='Sq'>Attempt " + total + ": Square</div>");
			} else {
				$('#output').append("<div class='notSq'>Attempt " + total + ": Not Square</div>");
			}
		}

		total++;

		// update stats
		$('#percSQ').text("Percentage Squares: " + ((squareCount / total) * 100).toFixed(3) + "%");
		$('#percNSQ').text("Percentage Not Squares: " + (((total - squareCount) / total) * 100).toFixed(3) + "%");
		$('#total').text("Total Attempts: " + total);

		$('#squares').text("Squares: " + squareCount);
		$('#notSquares').text("Not Squares: " + (total - squareCount));

		// display bar graph
		displayGraph();

	}, delay);
}