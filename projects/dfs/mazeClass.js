
// Maze class
function Maze(tempW) {

	this.rows;
	this.cols;
	this.w = tempW;

	this.grid;
	this.stack = [];
	this.currentCell;

	this.create = function() {

		this.cols = floor(width / this.w);
		this.rows = floor(height / this.w);

		// initialize grid
		this.grid = new Array(this.rows);
		for (var i = 0; i < this.grid.length; i++) {
			this.grid[i] = new Array(this.cols);
		}

		// add w to cell prototype
		Cell.prototype.w = this.w;

		// initialize cells
		for (var y = 0; y < this.grid.length; y++) {
			for (var x = 0; x < this.grid[y].length; x++) {
				this.grid[y][x] = new Cell(x, y);
			}
		}

		// add grid to cell prototype so cells can use it
		Cell.prototype.grid = this.grid;

		this.currentCell = this.grid[floor(this.rows / 2)][floor(this.cols / 2)];

		while (true) { // until stack is empty
			this.currentCell.walkable = true;
			this.currentCell.display();

			var nextCell = this.currentCell.checkNeighbors(); // get neighbor from current cell

			if (nextCell) { // if next cell exists
				nextCell.walkable = true;

				var mid = this.findMiddle(this.currentCell.x, this.currentCell.y, nextCell.x, nextCell.y) // find cell in between current / next
				mid.walkable = true;
				mid.display();

				this.stack.push(this.currentCell); // add current to stack
				this.currentCell = nextCell; // swap cells
			} else if (this.stack.length > 0) {
				this.currentCell = this.stack.pop(); // pop a cell off the stack
			} 

			if (this.stack.length == 0) { // if stack empty, end
				break;
			}
		}
	}

}

Maze.prototype.findMiddle = function(x, y, x1, y1) { // locates grid position between two positions
	if (x == x1) {
 			if (y < y1) {
 				return this.grid[y+1][x];
 			} else {
 				return this.grid[y1+1][x];
 			}
 		} else if (y == y1) {
 			if (x < x1) {
 				return this.grid[y][x+1];
 			} else {
 				return this.grid[y][x1+1];
 			}
 		}
}

// Cell class
function Cell(x, y) {
	// position in grid
	this.x = x;
	this.y = y;
	// actual position in canvas
	this.position = createVector(this.x * this.w, this.y * this.w);

	this.neighbors = [];
	this.walkable = false; // is the cell walkable

	this.display = function() {
		fill(150);
		rect(this.position.x, this.position.y, this.w, this.w);
	}

 	this.checkAndPushtoNeighbors = function(y, x) { // checks if grid position is legitimate
 		if (this.grid[y] != undefined && this.grid[y][x] != undefined && !this.grid[y][x].walkable) {
 			this.neighbors.push(this.grid[y][x]);
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