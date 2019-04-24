var n = 3;			// number of rings
var delay = 200;		// amount of delay used in visualization

// user input
$(document).ready( function() {
	$('#n').change( function() {
		n = parseInt($(this).val(), 10);

		// upper bound
		if (n > 20) {
			n = 20;
		}

		run(n);
	});

	$('#delay').change( function() {
		delay = parseInt($(this).val(), 10);

		run(n);
	});	

	$('#run').click( function() {
		run(n);
	});

	$('#end').click( function() {
		clearInterval(interval);
	});
});

function setup() {
	var canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0);
	canvas.style('z-index', '-1');
	rectMode(CENTER);

	run(n);
}

// run full visualization with n rings
function run(n) {
	clearInterval(interval);	// ensure interval is reset

	// update text
	$('#current').text(n);
	$('#moves').text(Math.pow(2, n) - 1 + " moves");

	// get solution
	hanoi(n);

	// get record of every state on way to solution
	var record = getRecord(n);

	// visualize record
	visualizeRecord(record, n);
}

// get the record of all states for a solution with n rings
function getRecord(n) {
	record = [];

	// initialize first state, all rings on peg 0
	var state = [[], [], []];
	for (var i = n - 1; i >= 0; i--) {
		state[0].push(i);
	}

	// add initial state to record
	record.push(getCopy(state));

	// for every change in solution
	for (var i = 0; i < solution.length; i++) {
		// get top position of peg to be moved, as determined by solution
		var temp = state[solution[i][0]].pop();

		// push to new peg, as determined by solution
		state[solution[i][1]].push(temp);

		record.push(getCopy(state));
	}

	return record;
}

// get copy of a state
function getCopy(state) {
	var temp = [];
	for (var i = 0; i < state.length; i++) {
		temp.push(state[i].slice());
	}
	return temp;
}

// slow visualization of process
var interval;
function visualizeRecord(record, n) {
	// random color ranges for random shades
	var rMin = random(0, 255);
	var rMax = random(rMin, 256);
	var gMin = random(0, 255);
	var gMax = random(gMin, 256);
	var bMin = random(0, 255);
	var bMax = random(bMin, 256);

	var colorRanges = [rMin, rMax, gMin, gMax, bMin, bMax];

	var index = 0;
	interval = setInterval( function() {
		if (index < record.length) {
			visualize(record[index], n, colorRanges);
			index++;
		} else {
			clearInterval(interval);
		}
	}, delay);
}

// visualize a single state (array of length 3, containing the rings which are on each peg) with n total rings
function visualize(state, n, colorRanges) {
	background(150);
	fill(255);


	var colors = [];
	for (var i = 0; i < n; i++) {
		colors.push(color(map(i, 0, n, colorRanges[1], colorRanges[0]), map(i, 0, n, colorRanges[3], colorRanges[2]), map(i, 0, n, colorRanges[5], colorRanges[4])));
	}

	// calculate peg and ring heights
	var pegHeight = height / 2;
	var ringHeight = pegHeight / (n + 4);

	push();
	translate(-width / 6, 0);

	// show pegs
	rect(width / 3, height / 2, 20, pegHeight);
	rect((2 * width) / 3, height / 2, 20, pegHeight);
	rect(width, height / 2, 20, pegHeight);

	// display every ring on each peg
	for (var peg = 0; peg < state.length; peg++) {
		for (var ring = 0; ring < state[peg].length; ring++) {
			// fill(map(state[peg][ring], 0, n - 1, 0, 255));
			fill(colors[state[peg][ring]]);

			// scale width of ring based on its value (0 through n);
			var wid = n == 1 ? width / 3 : map(state[peg][ring], 0, n - 1, width / 18, (width / 3) - 10);
			rect((width / 3) + (peg * (width / 3)), ((3 / 4) * height) - (ring * ringHeight) - (ringHeight / 2), wid, ringHeight);
		}
	}

	pop();

	// draw base
	rect(width / 2, (3 / 4) * height + (20 / 2), width, 20);
}