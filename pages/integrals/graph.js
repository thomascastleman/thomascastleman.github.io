// min and max values
var xMin = -20;
var xMax = 20;
var yMin = -20;
var yMax = 20;

// interval start and end for integration
var a = -7; 
var b = 10;

var accuracy = 0.005;

var delay = 0;	// delay in ms for visualization

// the function to be used
function f(x) {
	return (Math.pow(x, 3) / 200) + 3;
	// return Math.pow(x, 2);
	// return Math.pow(Math.E, x);
}

function setup() {
	var canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0);
	canvas.style('z-index', '-1');
	rectMode(CORNERS);
	textSize(15);
	background(75);
	stroke(255);

	autoWindow();
	vis(f, a, b);
}

// resize the window based on the interval
function autoWindow() {
	xMin = a - Math.floor(Math.abs(b - a));
	xMax = b + Math.floor(Math.abs(b - a));
	
	// get min and max of function in interval a-b
	var min = f(a);
	var max = f(a);
	for (var i = a; i <= b; i++) {
		if (f(i) < min) {
			min = f(i);
		} else if (f(i) > max) {
			max = f(i);
		}
	}

	// make min x-axis if not negative
	if (min > 0) {
		min = 0;
	}

	var margin = Math.abs(max - min);
	yMin = Math.floor(min - margin);
	yMax = Math.floor(max + margin);

	$('#xMintext').text(xMin);
	$('#xMaxtext').text(xMax);
	$('#yMintext').text(yMin);
	$('#yMaxtext').text(yMax);

	vis(f, a, b);
}

// show x and y axes
function showAxis() {
	strokeWeight(2);
	// x-axis
	var y = map(0, yMin, yMax, height, 0);
	line(0, y, width, y);

	// y-axis
	var x = map(0, xMin, xMax, 0, width);
	if (a == 0 || b == 0) {
		stroke(255, 0, 0);
	}
	line(x, 0, x, height);

	strokeWeight(1);
	stroke(0);
	fill(0);
	text(xMin, 20, y - 20);
	text(xMax, width - 20, y - 20);
	text(yMin, x + 20, height - 20);
	text(yMax, x + 20, 20);


	stroke(255);

	// show axis lines
	for (var i = xMin; i < xMax; i++) {
		line(map(i, xMin, xMax, 0, width), y - 3, map(i, xMin, xMax, 0, width), y + 3);
	}

	for (var i = yMin; i < yMax; i++) {
		line(x - 3, map(i, yMin, yMax, height, 0), x + 3, map(i, yMin, yMax, height, 0));
	}
}

// plot a point
function plot(x, y) {
	var screenX = map(x, xMin, xMax, 0, width);
	var screenY = map(y, yMin, yMax, height, 0);

	point(screenX, screenY);
}

// graph a given function func
function graph(func) {
	for (var x = xMin; x < xMax; x += accuracy) {
		plot(x, func(x));
	}
}

// visualize the integral of a function func from interval min to max
var interval;
function vis(func, min, max) {

	clearInterval(interval);

	// max number of rectangles in approximation (when width has reached 1px)
	var limit = Math.abs(map(max, xMin, xMax, 0, width) - map(min, xMin, xMax, 0, width));
	var rects = 1;	// initialize approximation with 1 rectangle

	interval = setInterval( function() {
		background(75);

		showIntegral(func, min, max, rects);	// show integral
		showAxis();								// show axes
		graph(func);							// graph function

		rects += 2;	// increment number of rectangles

		// if limit reached, stop
		if (rects > limit) {
			clearInterval(interval);
		}
	}, delay);
}

// display rectangles under curve from min to max with a given number of rectangles
function showIntegral(func, min, max, rects) {
	fill(150);
	stroke(0);


	var zero = map(0, yMin, yMax, height, 0);		// calculate x axis position on screen
	var deltaX = Math.abs(max - min) / rects;		// calculate delta X

	var area = 0.0;		// initialize approximated area

	for (var x = min; x < max - (deltaX / 2); x += deltaX) {
		area += func(x) * deltaX;	// add to area

		// get top left corner coordinates
		var screenX = map(x, xMin, xMax, 0, width);
		var screenY = map(func(x), yMin, yMax, height, 0);

		// draw rectangle from that point to x axis
		rect(screenX, screenY, map(x + deltaX, xMin, xMax, 0, width), zero);
	}

	// draw lines at interval min and max
	stroke(255, 0, 0);
	fill(255, 0, 0);
	strokeWeight(2);

	line(map(min, xMin, xMax, 0, width), 0, map(min, xMin, xMax, 0, width), height);
	line(map(max, xMin, xMax, 0, width), 0, map(max, xMin, xMax, 0, width), height);
	strokeWeight(1);
	
	text(min, map(min, xMin, xMax, 0, width) + 5, 20);
	text(max, map(max, xMin, xMax, 0, width) + 5, 20);
	
	stroke(255);

	$('#area').text(area.toFixed(3));
}