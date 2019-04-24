
// takes base 10 int, returns string representation of binary
function toBin(num) {
	var result = num.toString(2);
	if (result.length < 8) {
		var length = 8 - result.length;
		for (var i = 0; i < length; i++) {
			result = '0' + result;			// add extra 0s to ensure string is 8 digits long
		}
	}
	return result;
}

var currentGen;		// initial generation

var ruleset = toBin(30);														// the ruleset
var neighborhoods = ['111', '110', '101', '100', '011', '010', '001', '000'];	// array of all possible neighborhoods
var nextState;																	// associative array linking neighborhoods to digits of ruleset

var w; 				// width of a cell (for visualization)
var delay = 15;		// delay between generations
var genSize = 1500;	// number of cells in environment

function setup() {
	var canvas = createCanvas(windowWidth, windowHeight - 35);
	canvas.position(0, 35);
	noStroke();

	run(delay);
}

// receives a generation, returns the new generation based on rule
function wolfram(gen) {
	var nextGen = '';															// var to store the next generation
	for (var index = 0; index < gen.length; index++) {
		var neighborhood = '';
		for (var i = index - 1; i <= index + 1; i++) {							// initialize neighborhood
			if (i > gen.length - 1 || i < 0) {									// if index is out of range
				neighborhood += gen[i + (i < 0 ? gen.length : -gen.length)];	// loop around to other end of array
			} else {
				neighborhood += gen[i];											
			}
		}
		nextGen += nextState[neighborhood];										// add new state to nextGen based on neighborhood
	}
	return nextGen;
}

// displays a single generation given a y position
function displayGen(gen, yPos) {
	for (var i = 0; i < gen.length; i++) {
		fill(gen[i] == 1 ? color(0) : color(255));
		rect(i * w, yPos, w, w);
	}
}

var interval;
// calculate generations and display them, cascading down window
function run(delay) {
	background(255);	// refresh background
	nextState = {};
	// initialize nextState
	for (var i = 0; i < neighborhoods.length; i++) {
		nextState[neighborhoods[i]] = ruleset[i];
	}

	// initialize current generation
	currentGen = '';
	for (var i = 0; i < genSize; i++) {
		currentGen += (i == floor(genSize / 2) ? '1' : '0');											
	}

	w = Math.ceil(width / currentGen.length);	// width of cells 

	var count = 0;
	interval = setInterval( function() {
		displayGen(currentGen, count * w);				// display current generation
		currentGen = wolfram(currentGen);				// update current generation
		count = count * w > height ? 0 : count + 1;		// reset count if off screen
	}, delay);
}

// handles input
$(document).ready( function() {
	$('#ruleset').change( function() {
		clearInterval(interval);								// stop current calculation
		ruleset = toBin(parseInt($('#ruleset').val(), 10));		// convert to binary string
		run(delay);
	});

	$('#delay').change( function() {
		clearInterval(interval);								// stop current calculation
		delay = parseInt($('#delay').val(), 10);				// get value from delay input
		run(delay);												// run with new delay
	});

	$('#scale').change( function() {
		clearInterval(interval);
		genSize = parseInt($('#scale').val(), 10);				// get value from scale input
		run(delay);
	});
});