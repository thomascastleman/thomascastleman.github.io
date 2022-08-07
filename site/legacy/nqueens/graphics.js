
var n = 8;					// n by n board
var q;						// array of queen objects
var w;						// width & height of board squares

var showingAll = false;		// whether or not all threats are being shown
var showingIndiv;			// holds the properties of the individual queen whose threats are currently being shown

$(document).ready( function() {
	// find solution
	$('#run').click( function() {
		q = minConflict(n);
	});

	// calculate with new n value
	$('#n').change( function() {
		n = parseInt($('#n').val(), 10);
		// set minimums and maximums
		if (n == 2 || n == 3) {
			n = 4;
		} else if (n > 1000) {
			n = 1000;
		}
		q = minConflict(n);
		$('#currentN').text(n);
	});

	// toggle showing all threats
	$('#showAll').click( function() {
		if (showingAll) {
			vis(q);
		} else {
			showAll(q);
		}
	});
});

function setup() {
	var canvas = createCanvas(windowHeight - 10, windowHeight - 10);
	canvas.position(windowWidth / 4, 5);

	// default board of 8
	q = minConflict(n);
}

// display individual threats of a queen
function mousePressed() {
	// get board position of position mouse has clicked on
	var x = Math.floor(mouseX / w);
	var y = Math.floor(mouseY / w);

	// if position clicked is queen
	if (board[y][x] == "queen") {
		if (showingIndiv == undefined) {							// if no threats currently shown
			vis(q);														// refresh board
			showingIndiv = {x : x, y : y};								// assign showingIndiv to current position
			lines(showingIndiv);										// show threats
		} else if (showingIndiv.x == x && showingIndiv.y == y) {	// else if current position is already shown
			vis(q);														// refresh board, so no threats are shown
			showingIndiv = undefined;									// reset showingIndiv
		} else {													// otherwise, if showingIndiv exists and is not the current positions
			vis(q);														// refresh any other threats
			showingIndiv = {x : x, y : y};								// assign showingIndiv
			lines(showingIndiv);										// show threats
		}
	}
}

// visualize queen positions
function vis(queens) {
	background(15);
	stroke(50);
	strokeWeight(0.5);
	fill(66, 134, 244);
	w = height / board.length;
	
	showingAll = false;

	push();
	translate(0, 0);

	// draw grid lines
	if (queens.length < 700) {
		for (var i = 0; i < queens.length; i++) {
			line(i * w, 0, i * w, height);
			line(0, i * w, w * queens.length, i * w);
		}
	}

	// draw rectangles at queen positions
	for (var i = 0; i < queens.length; i++) {
		rect(queens[i].x * w, queens[i].y * w, w, w);
	}

	pop();
}

// display threats of a given queen
function lines(queen) {
	// map stroke weight based on size of board
	strokeWeight(map(n, 4, 50, 3, 1));
	if (n > 50) {
		strokeWeight(1);
		if (n > 150) {
			strokeWeight(0.5);
		}
	}

	var edgeConflicts = [];		// holds all edge positions that conflict with queen
	
	// for every row, get all conflicting positions on col == 0 or col == last col
	for (var r = 0; r < board.length; r++) {
		if (isDiagonal(0, r, queen.x, queen.y) || isAcross(0, r, queen.x, queen.y)) {
			edgeConflicts.push({x : 0, y : r});
		}
		if (isDiagonal(board.length - 1, r, queen.x, queen.y) || isAcross(board.length - 1, r, queen.x, queen.y)) {
			edgeConflicts.push({x : board.length - 1, y : r});
		}
	}

	// for every column, get all conflicting positions on row == 0 or row == last row
	for (var c = 1; c < board.length - 1; c++) {
		if (isDiagonal(c, 0, queen.x, queen.y) || isAcross(c, 0, queen.x, queen.y)) {
			edgeConflicts.push({x : c, y : 0});
		}
		if (isDiagonal(c, board.length - 1, queen.x, queen.y) || isAcross(c, board.length - 1, queen.x, queen.y)) {
			edgeConflicts.push({x : c, y : board.length - 1});
		}
	}

	stroke(255, 0, 0);

	// draw lines to edge positions (therefore through all conflicting positions)
	var queenCenter = getCenter(queen.x, queen.y, height / board.length);
	for (var i = 0; i < edgeConflicts.length; i++) {
		var center = getCenter(edgeConflicts[i].x, edgeConflicts[i].y, height / board.length);
		line(queenCenter.x, queenCenter.y, center.x, center.y);
	}

	stroke(50);
	strokeWeight(0.5);
	fill(66, 134, 244);
	rect(queen.x * w, queen.y * w, w, w);

}

// get the coordinates of the center of a given square in board
function getCenter(currentX, currentY, w) {
	return {x : (currentX * w) + (w / 2), y : (currentY * w) + (w / 2)};
}

// show threats for every queen
function showAll(queens) {
	showingAll = true;
	for (var i = 0; i < queens.length; i++) {
		lines(queens[i]);
	}
}