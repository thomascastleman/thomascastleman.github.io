// INITIALIZES ALL GLOBAL VARIABLES AND CONFIGURES GRID

var rows, cols;
var w = 30; 				// width in pixels of each node
var grid; 					// grid of nodes

var start, end; 			// starting and ending nodes

var openSet;				// nodes to be explored
var closedSet;				// nodes already explored
var path;					// the optimal path of nodes from start to end nodes


// input: 
var userSelect = false;		// whether or not the user is selecting the grid
var currentSelection;		// the element that the user is currently changing

var showParents = false;	// whether or not node parents are shown
var showCosts = false;		// whether or not node costs are shown
var heatmap = false;		// whether or not grid is shown in heatmap mode
var specs = false;			// whether or not node specs can be shown
var inSlowVis = false;		// whether or not slow visualization is currently happening


var slowVis;				// array to store all grid states, for slow visualization
var delay = 50;

var colors;					// node states and their corresponding colors for visualization


// creates canvas and refreshes variables
function setup() {
	var canvas = createCanvas(windowWidth - 210, windowHeight - 30);
	canvas.style('z-index', '-1');
	canvas.position(200, 10);
	stroke(0, 50);

	colors = {
		'none' : color(255),
		'wall' : color(0),
		'open' : color(0, 102, 255),
		'closed' : color(102, 204, 255),
		'path' : color(255, 0, 255),
		'start': color(0, 255, 0),
		'end': color(255, 0, 0)
	}

	// for slow visualization
	slowVis = [];
	inSlowVis = false;
	clearInterval(interval);

	rows = floor(height / w);
	cols = floor(width / w);

	specs = false;		// refresh specs

	// refresh grid and all sets
	grid = [];
	openSet = [];
	closedSet = [];
	path = [];

	// initialize grid and nodes
	for (var y = 0; y < rows; y++) {
		grid.push([]);
		for (var x = 0; x < cols; x++) {
			grid[y].push(new Node(x, y));

			if (userSelect == false) {			// if user not selecting boundaries
				if (Math.random() < 0.25) {
					grid[y][x].state = 'wall';		// randomize boundaries
				}
			}
		}
	}

	// default positions for start and end nodes
	start = grid[0][0];
	end = grid[rows - 1][cols - 1];
	start.state = 'start';
	end.state = 'end';

	displayGrid();
}

// calculates important initial values and configures start and end nodes after they have been selected 
function initialize() {
	start.gCost = 0;
	openSet.push(start);
	start.state = 'start';
	end.state = 'end';

	calculateHCost();	// calculate all hCosts 
}

// calculates hCost of every node
function calculateHCost() {
	for (var y = 0; y < grid.length; y++) {
		for (var x = 0; x < grid[y].length; x++) {
			grid[y][x].hCost = 10 * (abs(end.position.x - x) + abs(end.position.y - y));	// Manhattan distance to end node
		}
	}
}