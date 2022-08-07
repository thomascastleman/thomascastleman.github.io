var tri;			// multidimensional array to hold values
var mod = 2;		// number by which to mod
var seed = 1;		// starting number
var layers = 200;	// layers in triangle

var txt = false;

function setup() {
	var canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0);
	canvas.style('z-index', '-1');
	noStroke();
	rectMode(CENTER);
	textAlign(CENTER);
	textSize(10);

	run();
}

function run() {
	tri = pascal(layers, seed);
	showMod(mod);
}

// generate n layers of pascal's triangle with any given seed
function pascal(layers, seed) {
	var t = [[seed]];

	for (var i = 1; i < layers; i++) {

		var nextLayer = [];
		nextLayer.push(seed);	// add seed as first position in next layer

		// get sums from previous layer
		for (var n = 0; n < t[i - 1].length - 1; n++) {
			nextLayer.push(t[i - 1][n] + t[i - 1][n + 1]);
		}

		nextLayer.push(seed);	// add seed as last position

		t.push(nextLayer);		// add to array of all layers
	}

	return t;
}  

// visualize triangle based on a given mod value
function showMod(mod) {
	background(90);
	var states = [];

	// populate all possible states with a specific color
	for (var i = 0; i < mod; i++) { 
		states.push(color(random(0, 255), random(0, 255), random(0, 255)));
	}

	// vertical and horizontal spacing
	var spacing = width / tri[tri.length - 1].length;
	var vertSpac = height / tri.length;

	push();
	translate(spacing / 2, vertSpac / 2);

	// for each layer
	for (var i = 0; i < tri.length; i++) {
		var startPos = (width - (spacing * tri[i].length)) / 2;

		// for each number
		for (var k = 0; k < tri[i].length; k++) {

			// color rectangle based on state
			fill(states[tri[i][k] % mod]);
			rect(startPos + (spacing * k), (i * vertSpac), spacing / 2, spacing / 2);

			if (txt && layers <= 100) {
				fill(0);
				text(tri[i][k], startPos + (spacing * k), (i * vertSpac));
			}

		}
	}

	pop();
}