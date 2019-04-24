// HANDLES ALL USER INPUT

// jQuery
$(document).ready( function() {
	$('#selections').hide();
	$('#costError').hide();

	$('#slow').click( function() {
		slowVisualize();
	});

	$('#delay').change( function() {
		delay = parseInt($('#delay').val(), 10);
		slowVisualize();
	});	

	// generates a new random grid
	$('#refresh').click( function() {
		// prevents unnecessary execution of mousePressed()
		userSelect = false;
		setup();
	});

	// generates a single solution maze
	$('#maze').click( function() {
		setup();
		generateMaze();
		start.state = 'start';
		end.state = 'end';
		displayGrid();
	});

	// generates a multiple solution maze
	$('#imperfectMaze').click( function() {
		setup();
		generateMaze();
		start.state = 'start';
		end.state = 'end';
		imperfectMaze();
		displayGrid();
		specs = false;
	});

	// allows user to select the grid
	$('#userSelect').click( function() {
		userSelect = true;
		currentSelection = 'starting node';
		setup();
		if (!$('#selections').is(':visible')) {
			$('#selections').slideDown();
		}
		$('#currentSelect').text('Currently selecting the ' + currentSelection);
	});

	// changes element that user is selecting
	$('#startingNode').click( function() {
		currentSelection = 'starting node';
		$('#currentSelect').text('Currently selecting the ' + currentSelection);
	});
	$('#endNode').click( function() {
		currentSelection = 'end node';
		$('#currentSelect').text('Currently selecting the ' + currentSelection);
	});
	$('#boundaries').click( function() {
		currentSelection = 'boundaries';
		$('#currentSelect').text('Currently selecting the ' + currentSelection);
	});

	// changes grid size;
	$('#gridSize').change( function() {
		var size = parseInt($('#gridSize').val(), 10);
		size = size > 200 ? 200 : (size < 5 ? 5 : size);	// puts restriction on max and min grid sizes
		w = floor(width / size);
		setup();
	});

	// shows or hides node parents
	$('#parents').click( function() {
		if (inSlowVis) {									// if currently in slow visualization
			clearInterval(interval);						// end visualization
			inSlowVis = false;								// reset inSlowVis
			displaySets();									// refresh sets and path
			displayPath();
		}
		if (closedSet.length > 0 || openSet.length > 0) {	// if sets are not empty
			if (showParents == false) {						// if not currently showing parents
				displayParents(openSet);					// display both open and closed set parents
				displayParents(closedSet);
				showParents = true;							// record that parents are being shown
			} else {
				displaySets();								// refresh grid
				displayPath();								// refresh path
				showParents = false;						// reset showParents
				if (heatmap) {
					heatMap();
				}
				if (showCosts) {					// leave costs shown
					displayCost(openSet);
					displayCost(closedSet);
				}
			}
		}
	});

	// shows or hides node costs
	$('#costs').click( function() {
		if (inSlowVis) {									// if currently in slow visualization
			clearInterval(interval);						// end visualization
			inSlowVis = false;								// reset inSlowVis
			displaySets();									// refresh sets and path
			displayPath();
		}
		if (closedSet.length > 0 || openSet.length > 0) {	// if sets are not empty
			if (showCosts == false && w >= 24) {			// if not currently showing costs, and node size is large enough
				displayCost(openSet);						// display both open and closed set costs
				displayCost(closedSet);
				showCosts = true;							// record that costs are being shown
			} else {
				displaySets();								// refresh grid
				displayPath();								// refresh path
				showCosts = false;							// reset showCosts

				// respect previous settings
				if (heatmap) {
					heatMap();
				}
				if (showParents) {							// leave parents shown
					displayParents(openSet);
					displayParents(closedSet);
				}
			}
			if (w < 24) {									// if nodes too small, throw error (24px is min node size for text to fit)
				$('#costError').show();
				setTimeout( function() {
					$('#costError').fadeOut();
				}, 2000);
			}
		}
	});

	// toggle the heatmap view
	$('#heatMap').click( function() {
		clearInterval(interval);
		if (heatmap == false) {			// if not already showing, display as heatmap
			heatMap();
			heatmap = true;
		} else {						// otherwise, reset grid and path to default view
			displaySets();
			displayPath();
			heatmap = false;
		}

		// respect previous settings
		if (showParents) {
				displayParents(openSet);
				displayParents(closedSet);
			}
		if (showCosts) {
			displayCost(openSet);
			displayCost(closedSet);
		}
	});


	// runs the A* algorithm
	$('#run').click( function() {
		if (inSlowVis) {									// if currently in slow visualization
			clearInterval(interval);						// end visualization
			inSlowVis = false;								// reset inSlowVis
			displaySets();									// refresh sets and path
			displayPath();
		}

		if (openSet.length == 0 && closedSet.length == 0) {		// if algorithm has not already run, run
			initialize();					// calculate values
			aStar();						// run algorithm
			$('#selections').slideUp();		// hide selections
			userSelect = false;				// reset userSelect
			showParents = false;			// reset showParents
			showCosts = false;				// reset showCosts
			heatmap = false;				// reset heatmap

			specs = true;					// able to view specs
		}
	});
});

// functions for selecting nodes
function mousePressed() {
	if (userSelect || specs) {
		for (var y = 0; y < grid.length; y++) {
			for (var x = 0; x < grid[y].length; x++) {
				if (mouseX > grid[y][x].position.x * w && mouseX < grid[y][x].position.x * w + w) {
					if (mouseY > grid[y][x].position.y * w && mouseY < grid[y][x].position.y * w + w) {

						// if looking to show node specs
						if (specs) {
							$('#pos').text('(' + x + ', ' + y + ')');									// update position
							if (openSet.includes(grid[y][x]) || closedSet.includes(grid[y][x])) {		// if node has been evaluated, update costs
								$('#f').text(grid[y][x].fCost);
								$('#g').text(grid[y][x].gCost);
								$('#h').text(grid[y][x].hCost);
							} else {																	// otherwise show blank specs
								$('#f').text('--');
								$('#g').text('--');
								$('#h').text('--');
							}
						}

						// if taking user input
						if (userSelect) {
							if (currentSelection == 'starting node') {
								if (grid[y][x] != end && grid[y][x].state != 'wall') {			// if not the end node and not a wall
									start.state = 'none'			// reset current start
									start.display();				// display to show as blank
									start = grid[y][x];				// switch start variable to new starting node
									start.state = 'start';			// update state
									start.display();				// display
								}
							} else if (currentSelection == 'end node') {
								if (grid[y][x] != start && grid[y][x].state != 'wall') {			// if not the start node and not a wall
									end.state = 'none';				// reset current end
									end.display();					// display to show as blank
									end = grid[y][x];				// switch end variable to new end node
									end.state = 'end';				// update state
									end.display();					// display
								}
							} else if (currentSelection == 'boundaries') {
								if (grid[y][x] != start && grid[y][x] != end) {					// if not start or end nodes
									if (grid[y][x].state == 'wall') {
										grid[y][x].state = 'none';
									} else {
										grid[y][x].state = 'wall';
									}
									grid[y][x].display();
								}
							}
						}
					}
				}
			}
		}
	}
}



function mouseDragged() {
	if (currentSelection == 'boundaries' && userSelect == true) {
		for (var y = 0; y < grid.length; y++) {
			for (var x = 0; x < grid[y].length; x++) {
				if (mouseX > grid[y][x].position.x * w && mouseX < grid[y][x].position.x * w + w) {
					if (mouseY > grid[y][x].position.y * w && mouseY < grid[y][x].position.y * w + w) {
						if (grid[y][x] != start && grid[y][x] != end) {
							grid[y][x].state = 'wall';
							grid[y][x].display();
						}
					}
				}
			}
		}
	}
}