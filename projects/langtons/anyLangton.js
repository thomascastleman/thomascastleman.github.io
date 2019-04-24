var w = 3;
var cols, rows;
var grid;
var ant;

var pattern = 'RL';

var states; // associative array of color states and corresponding directions
var statesArray; // array of color states

var speed = 50;

function getSpeed(value) {
	speed = value;
}

function getInput(value) {
	pattern = '';
	for (var i = 0; i < value.length; i++) {
		if (value[i] == 'R' || value[i] == 'L') {
			pattern += value[i];
		}
	}
	if (pattern == '') {
		pattern = 'RL';
	}
}

function turn(currentDir, turn) { // current direction and 'R' or 'L' value
	var directions = ['up', 'right', 'down', 'left']; // directions in clockwise order
	turn = turn == 'R' ? 1 : -1;
	var newIndex = directions.indexOf(currentDir) + turn;
	if (newIndex < 0) {
		newIndex = 3;
	} else if (newIndex > 3) {
		newIndex = 0;
	}
	return directions[newIndex];
}

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0);
	canvas.style('z-index', '-1');
	background(0);
	frameRate(60);
	stroke(50);

	cols = floor(width / w);
	rows = floor(height / w);

	//initialize pattern states
	states = {};
	statesArray = [];
	for (var i = 0; i < pattern.length; i++) {
		var tempColor = color(random(0, 255), random(0, 255), random(0, 255));
		states[tempColor] = pattern[i];
		statesArray.push(tempColor);
	}

	// initialize cells
	grid = new Array(rows);
	for (var y = 0; y < rows; y++) {
		grid[y] = new Array();
		for (var x = 0; x < cols; x++) {
			grid[y].push(new Cell(x, y));
		}
	}

	// initialize ant
	ant = new Ant(floor(cols / 2), floor(rows / 2));
}

function draw() {
	for (var i = 0; i < speed; i++) {
		// update cell color / currect direction
		// display, then move to next cell
		ant.update();
		ant.display();
		ant.move();
	}
}

function Cell(x, y) {
	this.location = createVector(x * w, y * w);
	this.gridPos = createVector(x, y);
	this.color = statesArray[0]; // initialize color as first in statesArray

	this.display = function() {
		fill(this.color);
		rect(this.location.x, this.location.y, w, w);
	}
}

function Ant(x, y) {
	this.gridPos = createVector(x, y); // Ant's position in array of cells
	this.direction = 'up'; // direction facing

	this.update = function() {
		this.direction = turn(this.direction, states[grid[this.gridPos.y][this.gridPos.x].color]); // turn current direction based on the value from states that corresponds with the current cell's color

		var currentIndex = statesArray.indexOf(grid[this.gridPos.y][this.gridPos.x].color); // find the index in statesArray of the state of the current cell
		grid[this.gridPos.y][this.gridPos.x].color =  statesArray[currentIndex + 1 >= statesArray.length ? 0 : currentIndex + 1]; // change color of current cell to next in the sequence (defined by statesArray)
	}

	this.move = function() {
		// move in that direction
		if (this.direction == 'up') {
			this.gridPos.y -= 1;
		}
		if (this.direction == 'down') {
			this.gridPos.y += 1;
		}
		if (this.direction == 'left') {
			this.gridPos.x -= 1;
		}
		if (this.direction == 'right') {
			this.gridPos.x += 1;
		}
		// infinite canvas
		if (this.gridPos.y < 0) {
			this.gridPos.y += grid.length;
		}
		if (this.gridPos.y > grid.length - 1) {
			this.gridPos.y %= grid.length;
		}
		if (this.gridPos.x < 0) {
			this.gridPos.x += grid[this.gridPos.y].length;
		}
		if (this.gridPos.x > grid[this.gridPos.y].length - 1) {
			this.gridPos.x %= grid[this.gridPos.y].length;
		}
	}

	this.display = function() {
		fill(grid[this.gridPos.y][this.gridPos.x].color); // the ant actually displays as the color of the cell it is on, so no cells are actually being displayed
		rect(grid[this.gridPos.y][this.gridPos.x].location.x, grid[this.gridPos.y][this.gridPos.x].location.y, w, w);
	}
}