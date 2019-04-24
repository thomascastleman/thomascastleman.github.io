// THE A* ALGORITHM ITSELF

function aStar() {
	while (true) { 							// until current node has reached end node
		if (openSet.length == 0) {			// protects against no solution
			break;
		} else {
			var current = getPromisingNode(); 	// node in open set with best prospects

			openSet.splice(openSet.indexOf(current), 1);	// remove current from open set
			closedSet.push(current);						// add to closed set
			current.state = 'closed';

			if (current == end) {							// if end node has been reached
				break;
			}

			// for all surrounding nodes
			for (var y = current.position.y - 1; y <= current.position.y + 1; y++) {
				for (var x = current.position.x - 1; x <= current.position.x + 1; x++) {

					if (grid[y] != undefined) {			// ensures that if grid position does not exist, neighbor = undefined
						var neighbor = grid[y][x];
					} else {
						neighbor = undefined;
					}

					if (neighbor != undefined) {
						if (!(neighbor.state == 'wall' || closedSet.includes(neighbor) || neighbor == current)) {	// if node is legitimate
							var tempG = neighbor.calcGCost(current);												// calculate a tentative gCost based off of current node

							if (tempG < neighbor.gCost || !(openSet.includes(neighbor))) {							// if tentative gCost is better than previous, or neighbor has not already been explored
								neighbor.parent = current;		// update parent
								neighbor.calcFCost();			// update fCost

								if (!(openSet.includes(neighbor))) {
									openSet.push(neighbor);		// add neighbor to open set
									neighbor.state = 'open';
								}
							}
						}
					}
				}
			}

			// push copies of grid states to slowVis to be used later for slow visualization of search
			var temp = new Array(grid.length);
			for (var y = 0; y < grid.length; y++) {
				temp[y] = new Array(grid[y].length);
				for (var x = 0; x < grid[y].length; x++) {
					temp[y][x] = grid[y][x].state;
				}
			}
			slowVis.push(temp.slice());
			
		}
	}

	// reconstruct optimal path
	if (openSet.length != 0) {			// if path was found
		path = [];						// refresh path
		var pathNode = end;
		while (pathNode != start) {		// while not back at start
			path.push(pathNode);		// add to path
			pathNode.state = 'path';	// update state for visualization
			pathNode = pathNode.parent;	// move to parent
		}
		path.push(start);				// add starting node to path for path visualization

		start.state = 'start';
		end.state = 'end';

		displaySets();
		displayPath();					// display path
	} else {
		$('#length').text('Path not found');	// path could not be found
		$('#explored').text('Nodes Explored: ' + closedSet.length);

		displaySets();					// display algorithm's attempt to find path
	}

	return path;
}

function getPromisingNode() {
	var minArray = [];			// array to hold the nodes with the lowest fCosts
	var min = openSet[0].fCost;	// intitialize min as fCost of first node in openSet

	for (var i = 0; i < openSet.length; i++) {
		if (openSet[i].fCost < min) {	// if new min found
			min = openSet[i].fCost;		// replace min
			minArray = [];				// reset min array
		}
		if (openSet[i].fCost == min) {	// if another node with same fCost is found, push it to min array
			minArray.push(openSet[i]);
		}
	}

	if (minArray.length > 1) {			// if minArray contains more than just one node, compare hCosts
		var min = minArray[0];
		for (var i = 0; i < minArray.length; i++) {
			if (minArray[i].hCost < min.hCost) {		// if new min found
				min = minArray[i];						// replace min
			}
		}
		return min;				// return node with lowest hCost
	} else {
		return minArray[0];		// return only node in min array
	}
}