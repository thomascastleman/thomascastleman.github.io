var rows, cols
var w = 5;
var speed = 20;

var grid;
var stack = [];
var currentCell;

function findMiddle(x, y, x1, y1) { // locates grid position between two positions
 		if (x == x1) {
 			if (y < y1) {
 				return grid[y+1][x];
 			} else {
 				return grid[y1+1][x];
 			}
 		} else if (y == y1) {
 			if (x < x1) {
 				return grid[y][x+1];
 			} else {
 				return grid[y][x1+1];
 			}
 		}
}

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0); 
	noStroke();
	background(0);
	frameRate(60);

	cols = floor(width / w);
	rows = floor(height / w);

	// initialize grid
	grid = new Array(rows);
	for (var i = 0; i < grid.length; i++) {
		grid[i] = new Array(cols);
	}

	// initialize cells
	for (var y = 0; y < grid.length; y++) {
		for (var x = 0; x < grid[y].length; x++) {
			grid[y][x] = new Cell(x, y);
		}
	}

	currentCell = grid[0][0];
}

function draw() {
	for (var i = 0; i < speed; i++) {
		currentCell.walkable = true;
		currentCell.display();

		var nextCell = currentCell.checkNeighbors(); // get neighbor from current cell

		if (nextCell) { // if next cell exists
			nextCell.walkable = true;

			var mid = findMiddle(currentCell.x, currentCell.y, nextCell.x, nextCell.y) // find cell in between current / next
			mid.walkable = true;
			mid.display();

			stack.push(currentCell); // add current to stack
			currentCell = nextCell; // swap cells
		} else if (stack.length > 0) {
			currentCell = stack.pop(); // pop a cell off the stack
		}
	}
}

function Cell(x, y) {
	// position in grid
	this.x = x;
	this.y = y;
	// actual position in canvas
	this.position = createVector(this.x * w, this.y * w);

	this.neighbors = [];
	this.walkable = false; // is the cell walkable

	this.display = function() {
		fill(150);
		rect(this.position.x, this.position.y, w, w);
	}

 	this.checkAndPushtoNeighbors = function(y, x) { // checks if grid position is legitimate
 		if (grid[y] != undefined && grid[y][x] != undefined && !grid[y][x].walkable) {
 			this.neighbors.push(grid[y][x]);
 		}
 	}

	this.checkNeighbors = function() {
        this.neighbors = [];

        // push all legitimate neighbors to neighbor array
        this.checkAndPushtoNeighbors(this.y-2, this.x);
        this.checkAndPushtoNeighbors(this.y, this.x-2);
        this.checkAndPushtoNeighbors(this.y+2, this.x);
        this.checkAndPushtoNeighbors(this.y, this.x+2);
 
 		// if neighbors exist, return a random neighbor
        return this.neighbors.length > 0 ? this.neighbors[floor(random(0, this.neighbors.length))] : undefined;
    }
}	