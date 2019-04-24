// GENERATES MAZE

function generateMaze() {
	// set all nodes to wall
	for (var y = 0; y < grid.length; y++) {
		for (var x = 0; x < grid[y].length; x++) {
			grid[y][x].state = 'wall';
		}
	}

	var stack = [];
	var currentNode = grid[0][0];

	while (true) { // until stack is empty
		currentNode.state = 'none';
		var nextCell = checkNeighbors(currentNode); // get neighbor from current cell

		if (nextCell) { // if next cell exists
			nextCell.state = 'none';

			var mid = findMiddle(currentNode.position.x, currentNode.position.y, nextCell.position.x, nextCell.position.y) // find cell in between current / next
			mid.state = 'none';

			stack.push(currentNode); // add current to stack
			currentNode = nextCell; // swap cells
		} else if (stack.length > 0) {
			currentNode = stack.pop(); // pop a cell off the stack
		} 

		if (stack.length == 0) { // if stack empty, end
			break;
		}
	}
}

// removes walls at random to create multiple solutions
function imperfectMaze() {
	for (var y = 0; y < grid.length; y++) {
		for (var x = 0; x < grid[y].length; x++) {
			if (grid[y][x].state == 'wall') {
				if (Math.random() < 0.1) {
					grid[y][x].state = 'none';
				}
			}
		}
	}
}

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

function checkAndPushtoNeighbors(neighbors, y, x) { // checks if grid position is legitimate
 	if (grid[y] != undefined && grid[y][x] != undefined && grid[y][x].state == 'wall') {
 		neighbors.push(grid[y][x]);
	}
}

function checkNeighbors(node) {
    var neighbors = [];

    // push all legitimate neighbors to neighbor array
    checkAndPushtoNeighbors(neighbors, node.position.y-2, node.position.x);
    checkAndPushtoNeighbors(neighbors, node.position.y, node.position.x-2);
    checkAndPushtoNeighbors(neighbors, node.position.y+2, node.position.x);
    checkAndPushtoNeighbors(neighbors, node.position.y, node.position.x+2);
 
	// if neighbors exist, return a random neighbor
    return neighbors.length > 0 ? neighbors[floor(random(0, neighbors.length))] : undefined;
}



