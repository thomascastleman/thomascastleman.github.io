Cell.prototype.highlightStart = function() { // green starting node
	fill(0, 255, 0);
	rect(this.position.x, this.position.y, this.w, this.w);
}
Cell.prototype.highlightEnd = function() { // red ending node
	fill(255, 0, 0);
	rect(this.position.x, this.position.y, this.w, this.w);
}
Cell.prototype.highlightPath = function() { // white path
	fill(0, 0, 204);
	rect(this.position.x, this.position.y, this.w, this.w);
}
Cell.prototype.highlightCurrent = function() { // white path
	fill(0, 255, 255);
	rect(this.position.x, this.position.y, this.w, this.w);
}

Cell.prototype.DFSPushtoNeighbors = function(y, x) { // checks if grid position is legitimate
 		if (this.grid[y] != undefined && this.grid[y][x] != undefined && this.grid[y][x].walkable && !this.grid[y][x].path) { // if it is walkable, and is not already part of the path
 			this.neighbors.push(this.grid[y][x]);
 		}
 	}

Cell.prototype.DFSNeighbors = function() { // checks neighbors directly around cell
	this.neighbors = []; // just use the same neighbors array as was used to generate the maze

	this.DFSPushtoNeighbors(this.y-1, this.x);
	this.DFSPushtoNeighbors(this.y, this.x-1);
	this.DFSPushtoNeighbors(this.y+1, this.x);
	this.DFSPushtoNeighbors(this.y, this.x+1);

	return this.neighbors.length > 0 ? this.neighbors[floor(random(0, this.neighbors.length))] : undefined;
}

var maze;
var start;
var end;
var stack = [];

var speed = 1;
var gridSize = 10;
var current;

$(document).ready( function() {
	// $('#container').hover( function() {
	// 	$('#container').slideToggle();
	// }, function() {
	// 	$('#container').slideToggle();
	// });

	$('#speed').change( function() {
		speed = parseInt($('#speed').val(), 10);
	});
	$('#size').change( function() {
		gridSize = abs(parseInt($('#size').val(), 10));
		setup();
	});
});

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0);
	canvas.style('z-index', '-1');
	noStroke();
	background(0);
	frameRate(60);

	// create a new Maze
	maze = new Maze(gridSize);
	maze.create();

	start = maze.grid[0][0].walkable == true ? maze.grid[0][0] : maze.grid[1][1];
	end = maze.grid[maze.rows - 1][maze.cols - 1].walkable == true ? maze.grid[maze.rows - 1][maze.cols - 1] : maze.grid[maze.rows - 2][maze.cols - 2];

	start.highlightStart();
	end.highlightEnd();


	//depthFirstSearch();
	current = start;
}

function draw() {

	for (var i = 0; i < speed; i++) {
		if (current == end) { // if goal reached, break
				// break;
		} else {
			var next = current.DFSNeighbors(); // get neighbor from current
			current.path = true;
			current.highlightPath();

			if (next) { // if next is legitimate
				stack.push(current); // push current to stack
				current = next; // swap them
			} else if (stack.length > 0) { // if stack is not empty
				current.display(); // unhighlight path
				current = stack.pop(); // pop from stack
			}
		}
	}

	start.highlightStart();
	end.highlightEnd();

}

// without displaying the process
function depthFirstSearch() {
	var current = start;
	while (true) {
		if (current == end) { // if goal reached, break
			break;
		} else {
			var next = current.DFSNeighbors(); // get neighbor from current
			current.path = true;
			current.highlightPath();

			if (next) { // if next is legitimate
				stack.push(current); // push current to stack
				current = next; // swap them
			} else if (stack.length > 0) { // if stack is not empty
				current.display(); // unhighlight path
				current = stack.pop(); // pop from stack
			}
		}

		//current.highlightCurrent();
	}
	start.highlightStart();
	end.highlightEnd();
}
