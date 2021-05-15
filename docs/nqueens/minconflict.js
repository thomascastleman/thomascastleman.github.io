
var board;

// checks if two points conflict (are diagonal or across)
function doConflict(x, y, x1, y1) {
	return (isDiagonal(x, y, x1, y1) || isAcross(x, y, x1, y1));
}

// are two points diagonal to each other?
function isDiagonal(x, y, x1, y1) {
	return ((x - y == x1 - y1) || (x + y == x1 + y1)) ? true : false;
}

// are two points across from each other?
function isAcross(x, y, x1, y1) {
	return (x == x1 || y == y1) ? true : false;
}

// find solution for n by n board
function minConflict(n) {
	var possibilites = [];
	for (var i = 0; i < n; i++) {
		possibilites.push(i);
	}

	board = [];
	var queens = [];
	// initialize board as 0s, place queens randomly on different rows and cols
	for (var row = 0; row < n; row++) {
		board.push(new Array(n));
		for (var col = 0; col < board[row].length; col++) {
			board[row][col] = 0;
		}
		var ind = possibilites[Math.floor(Math.random() * possibilites.length)];	// choose random index from available
		queens.push({x : ind, y : row});											// add to queens
		possibilites.splice(possibilites.indexOf(ind), 1);							// remove this index as a possibility
	}


	// initialize conflict values for all queens
	initializeConflicts(queens);

	var netConflict;							// the sum of all conflicts; when 0, solution is reached
	var lastRow;								// the last row in which a change was made

	var temp = 100.0							// likelihood to accept degrading solutions
	var rate = 1 - (1 / (n));					// rate of change, dependent on n



	var iter = 0;								// iterations

	console.log("Rate of change: " + rate + "%");
	console.time("Runtime");
	$('#conflicts').text("");
	$('#descrip').text("");
	$('#descrip').prepend("N: " + n + ", temperature rate of decrease: " + rate.toFixed(4) + "%");

	// until solution found
	while (netConflict != 0) {

		var current = getMostConflict(queens, lastRow);		// get queen with most conflict
		queens.splice(queens.indexOf(current), 1);			// remove from queens

		var next;	// next position

		if (temp != 0 && Math.random() * 100 < temp) {

			var rand = Math.floor(Math.random() * board[current.y].length);			// select random index

			// update that position's conflict sum
			board[current.y][rand] = 0;
			for (var q = 0; q < queens.length; q++) {
				if (doConflict(rand, current.y, queens[q].x, queens[q].y)) {
					board[current.y][rand]++;
				}
			}

			next = {x : rand, y : current.y, conflict: board[current.y][rand]};		// next becomes random position

		} else {

			var lowestConflict = {x : current.x, y : current.y, conflict: current.conflict};	// initialize lowest conflict as current conflict, to avoid moving to a degrading position

			// loop through current row, setting values to their conflict sum and updating the lowest conflict sum simultaneously
			for (var x = 0; x < board[current.y].length; x++) {
				board[current.y][x] = 0;											// reset to 0
				for (var q = 0; q < queens.length; q++) {
					if (doConflict(x, current.y, queens[q].x, queens[q].y)) {
						board[current.y][x]++;										// increment conflict sum
					}
				}

				// check for new lowest
				if (x != current.x && board[current.y][x] <= lowestConflict.conflict) {
					lowestConflict = {x : x, y : current.y, conflict: board[current.y][x]};
				}
			}

			next = lowestConflict;

		}

		// update conflicts without having to recalculate every conflict unnecessarily
		netConflict = 0;
		for (var q = 0; q < queens.length; q++) {
			if (doConflict(current.x, current.y, queens[q].x, queens[q].y)) {		// if conflicts with former position of current
				queens[q].conflict--;												// decrement conflict, as current is no longer there
			}
			if (doConflict(next.x, next.y, queens[q].x, queens[q].y)) {				// if conflicting with new position
				queens[q].conflict++;												// increment conflict, as new is existent
			}
			netConflict += queens[q].conflict;										// update net conflict
		}

		netConflict += next.conflict;		// add conflict of new position to net conflict

		if (iter == 0) {
			var initialConflict = netConflict;
		}

		// update text
		var color = Math.floor(map(netConflict, 0, initialConflict, 255, 0));
		$('#conflicts').append("<span style='color: rgb(" + (color < 0 ? Math.floor(map(color, -255, 0, 255, 0)) : 0) + ", " + color + ", " + 0 + ");'>Iteration " + iter + " -- Net Conflict: " + netConflict + ", Temp: " + temp.toFixed(3) + "</span><br>");

		queens.push(next);					// update queens
		lastRow = current.y;				// update last row
		temp *= rate;						// decrease temperature
		iter++;								// increment iteration count

		// reset if simulated annealing fails to escape local optimum
		if (temp < 0.0001) {
			temp = 100.0;
			iter = 0;
			$('#conflicts').text("");
			$('#descrip').text("");
			$('#descrip').prepend("N: " + n + ", temperature rate of decrease: " + rate.toFixed(4) + "%");
			console.log("Temp reached 0");
		}

		if (iter > 10000) {
			break;
		}
	}

	console.timeEnd("Runtime");

	for (var i = 0; i < queens.length; i++) {
		board[queens[i].y][queens[i].x] = "queen";
	}

	$('#descrip').append("<br><span>" + iter + " Iterations.</span>");

	vis(queens);

	return queens;
}

// initialize conflicts for all queens -- only to be run once, conflicts are later updated dynamically
function initializeConflicts(queens) {
	for (var q = 0; q < queens.length; q++) {
		queens[q].conflict = 0;
		for (var other = 0; other < queens.length; other++) {
			if (queens[q] != queens[other] && doConflict(queens[q].x, queens[q].y, queens[other].x, queens[other].y)) {
				queens[q].conflict++;
			}
		}
	}
}

// returns queens of most conflict
function getMostConflict(queens, lastRow) {
	var highest = queens[0];
	for (var i = 0; i < queens.length; i++) {
		if (queens[i].conflict > highest.conflict && queens[i].y != lastRow) {
			highest = queens[i];
		}
	}
	return highest;
}