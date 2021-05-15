var rows;
var cols;
var w = 20;
var grid;

var frame = 10.0;

var colors = false;
var colornum;

function changeColors() {
	colors = colors ? false : true;
	if (colors) {
		colornum = floor(random(0, 3));
	}
}

function getValue(value) {
	w = abs(value);
}
function getFramerate(value) {
	frame = float(value);
}

function setup() {
	var canvas = createCanvas(window.innerWidth, window.innerHeight);
	canvas.position(0, 0);
	canvas.style("z-index", "-1");
	strokeWeight(1);
	frameRate(frame != undefined ? frame : 10);

	colornum = floor(random(0, 3));

	cols = floor(width / w);
	rows = floor(height / w);

	grid = new Array(rows);

	// initialize all cells in grid
	for (var y = 0; y < rows; y++) {
		grid[y] = new Array();
		for (var x = 0; x < cols; x++) {
			grid[y].push(new Cell(x, y));
		}
	}
}

function draw() {
	background(200);
	gridUpdate();
	drawGrid();
}

function drawGrid() {
	stroke(150);
	for (var i = 0; i < height; i += w) {
		line(0, i, width, i);
	}
	for (var i = 0; i < width; i += w) {
		line(i, 0, i, height);	
	}
}

function gridUpdate() {
	for (var y = 0; y < grid.length; y++) { // calculate the updated state for all cells
		for (var x = 0; x < grid[y].length; x++) {
			grid[y][x].checkGridPosition();
			grid[y][x].updateNextState();
		}
	}
	for (var y = 0; y < grid.length; y++) { // update all cells 
		for (var x = 0; x < grid[y].length; x++) {
			grid[y][x].update();
			grid[y][x].display();
		}
	}
}

function Cell(i, j) {
	this.i = i;
	this.j = j;
	this.xPos = i * w;
	this.yPos = j * w;

	this.alive = Math.random() < 0.5 ? true : false;
	this.nextState;
	this.neighbors;

	this.display = function() {
		if (this.alive) {
			if (colors) {
				this.checkGridPosition();
				fill(0, map(this.neighbors, 0, 8, 0, 255), map(this.neighbors, 0, 8, 0, 255));
			} else {
				fill(0);
			}
			
			rect(this.xPos, this.yPos, w, w);
		}
	}

	this.checkGridPosition = function() { // analyze every position around the cell to determine neighbors
		this.neighbors = 0;
		for (var x = this.j - 1; x <= this.j + 1; x++) {
			for (var y = this.i - 1; y <= this.i + 1; y++) {
				if (((x >= 0) && (x < rows)) && ((y >= 0) && (y < cols))) { // if the position is legitimate
					if (!(x == this.j && y == this.i)) { // if this position isn't the given position
						if (grid[x][y].alive) {
							this.neighbors += 1;
						} 
					}
				}
			}
		}
	}

	this.updateNextState = function() { // changes a single grid position to on or off based on neighbors and current state
		this.nextState = this.alive;
		if (this.alive == true) { // if already living
			if ((this.neighbors < 2) || (this.neighbors > 3)) {
				this.nextState = false; // die
			}
		} else { // if already dead
			if (this.neighbors == 3) {
				this.nextState = true; // live 
			}
		}
	}

	this.update = function() {
		this.alive = this.nextState;
	}
}