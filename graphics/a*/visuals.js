
// displays full grid
function displayGrid() {
	for (var y = 0; y < grid.length; y++) {
	    for (var x = 0; x < grid[y].length; x++) {
	        grid[y][x].display();
	    }
	}
}

// only display the open and closed sets
function displaySets() {
	for (var i = 0; i < openSet.length; i++) {
		openSet[i].display();
	}
	for (var i = 0; i < closedSet.length; i++) {
		closedSet[i].display();
	}
}

// displays grid like a heatmap, coloring based on fCost
function heatMap() {
	if (openSet.length > 0 || closedSet.length > 0) {			// if sets exist and are not empty
		strokeWeight(1);
		stroke(0, 50);

		var minF = openSet[0].fCost;
		var maxF = minF;

		// find min and max fCost over both closed and open sets
		for (var i = 0; i < openSet.length; i++) {
			if (openSet[i].fCost < minF) {
				minF = openSet[i].fCost;
			} else if (openSet[i].fCost > maxF) {
				maxF = openSet[i].fCost;
			}
		}
		for (var i = 0; i < closedSet.length; i++) {
			if (closedSet[i].fCost < minF) {
				minF = closedSet[i].fCost;
			} else if (closedSet[i].fCost > maxF) {
				maxF = closedSet[i].fCost;
			}
		}

		for (var i = 0; i < openSet.length; i++) {
			var scale1 = map(openSet[i].fCost, minF, maxF, 0, 255);
			var scale2 = map(openSet[i].fCost, minF, maxF, 255, 0);
		    fill(scale1, scale2, 0);
		    rect(openSet[i].position.x * w, openSet[i].position.y * w, w, w);
		}
		for (var i = 0; i < closedSet.length; i++) {
			var scale1 = map(closedSet[i].fCost, minF, maxF, 0, 255);
			var scale2 = map(closedSet[i].fCost, minF, maxF, 255, 0);
		    fill(scale1, scale2, 0);
		    rect(closedSet[i].position.x * w, closedSet[i].position.y * w, w, w);
		}

		start.display();
		end.display();
		displayPath();
	}
}

// displays the optimal path stored in the global variable "path"
function displayPath() {
	for (var i = 0; i < path.length - 1; i++) {		// display lines
		stroke(0);
		strokeWeight(3);
		line(path[i].position.x * w + (w/2), path[i].position.y * w + (w/2), path[i + 1].position.x * w + (w/2), path[i + 1].position.y * w + (w/2));
	}

	// update stats
	$('#length').text('Path Found: ' + path.length + ' nodes');
	$('#explored').text('Nodes Explored: ' + closedSet.length);
}

// displays every node in the path array
function displayPathNodes() {
	for (var i = 0; i < path.length; i++) {
		path[i].display();
	}
}

// displays the parents of a given set of nodes
function displayParents(set) {
	stroke(0, 125);
	strokeWeight(3);
	for (var i = (set == closedSet ? 1 : 0); i < set.length; i++) {		// start at 1 because starting node has no parent
		line(set[i].position.x * w + (w/2), set[i].position.y * w + (w/2), set[i].parent.position.x * w + (w/2), set[i].parent.position.y * w + (w/2));
	}
}

// displays the fCosts of a given set of nodes
function displayCost(set) {
	textAlign(CENTER);
	textSize(map(w, 24, 178, 12, 40));		// scale text size based on width of nodes
	stroke(0);
	fill(255);
	for (var i = (set == closedSet ? 1 : 0); i < set.length; i++) {
		text(set[i].fCost, set[i].position.x * w + (w/2), set[i].position.y * w + (w/2));	// show fCost at center of each node
	}
}

// display a copy of a previous grid state from slowVis, specified by index
function displayGridCopy(index) {
	var copy = slowVis[index];
	for (var y = 0; y < copy.length; y++) {
		for (var x = 0; x < copy[y].length; x++) {
			// display only nodes that are not null or walls or already in the closed set
			if (copy[y][x] != "none" && copy[y][x] != "wall" && !(copy[y][x] == "closed" && slowVis[index - 1][y][x] == "closed")) {
				fill(colors[copy[y][x]]);
				strokeWeight(1);
				stroke(0, 50);
				rect(x * w, y * w, w, w);
			}
		}
	}
	start.display();	// ensure start is shown
}

// slow visualization of the pathfinding process
var interval;
function slowVisualize() {
	// if a* has been run
	if ((openSet.length != 0 && closedSet.length != 0)) {	
		clearInterval(interval);	// ensure previous interval is stopped
		inSlowVis = true;
		showParents = false;
		showCosts = false;
		// display entire grid only once, as boundaries will not change
		for (var y = 0; y < slowVis[0].length; y++) {
			for (var x = 0; x < slowVis[0][y].length; x++) {
				fill(colors[slowVis[0][y][x]]);
				strokeWeight(1);
				stroke(0, 50);
				rect(x * w, y * w, w, w);
			}
		}
		start.display();

		var index = 1;
		// display each instance in slowVis
		interval = setInterval( function() {
			if (index != slowVis.length) {
				displayGridCopy(index);						// display grid state
				index++;									// increment to next state
			} else {
				inSlowVis = false;
				clearInterval(interval);					// end interval
				displayPathNodes();							// display ndoes on path
				displayPath();								// display path line
				index = 0;
			}
		}, delay);
	}
}