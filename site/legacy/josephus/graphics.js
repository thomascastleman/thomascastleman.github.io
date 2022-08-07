var n = 41;
var locations;
var s;

var delay = 200;

$(document).ready( function() {
	$('#run').click( function() {
		run(n);
	});

	$('#n').change( function() {
		n = parseInt($('#n').val(), 10);
		if (n <= 0) {
			n = 1;
		}
		run(n);
	});
	$('#delay').change( function() {
		delay = parseInt($('#delay').val(), 10);
		run(n);
	});
});

function setup() {
	var canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0);
	canvas.style('z-index', '-1');
	background(45);

	run(n);
}

function run(n) {
	textSize(map(n, 1, 300, 17, 5));
	s = map(n, 1, 500, 12, 2);
	
	if (n > 500) {
		s = 2;
	}
	
	locations = [];
	var scale = height / 2 - 30;

	for (var i = 0; i < 2 * PI; i += (2 * PI) / n) {
		locations.push(createVector(cos(i) * scale, sin(i) * scale));
	}
	if (locations.length > n) {
		locations.pop();
	}

	displayCircles();

	$('#pos').text(josephus(n));

	visualize();
}



function displayCircles() {
	// background(45);
	background(20);
	push();
	translate(width / 2, height / 2);

	if (n > 500) {
		noStroke();
	} else {
		stroke(0);
	}
	fill(255);
	for (var i = 0; i < locations.length; i++) {
		ellipse(locations[i].x, locations[i].y, s, s);
		if (n < 350) {
			text(i, locations[i].x, locations[i].y);
		}
	}
	pop();
}

var interval;	
function visualize() {
	clearInterval(interval);
	var ind = 0;

	interval = setInterval( function() {
		if (ind < record.length - 1) {
			push();
			translate(width / 2, height / 2);
			stroke(200);
			line(locations[record[ind]].x, locations[record[ind]].y, locations[record[ind + 1]].x, locations[record[ind + 1]].y);
			fill(255, 0, 0);
			
			if (n > 500) {
				noStroke();
			} else {
				stroke(0);
			}
			ellipse(locations[record[ind + 1]].x, locations[record[ind + 1]].y, s, s);
			fill(255);
			if (n < 350) {
				text(record[ind + 1], locations[record[ind + 1]].x, locations[record[ind + 1]].y);
			}
			pop();
			ind += 2;
		} else {
			clearInterval(interval);
		}
	}, delay);
}