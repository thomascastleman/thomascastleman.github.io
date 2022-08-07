
var solution;

// get solution to hanoi with n rings
function hanoi(n) {
	solution = [];
	move(n, 0, 2, 1);
}

// move n rings from beginning position to end, with the optional use of spare position
function move(n, begin, end, spare) {
	if (n == 1) {
		solution.push([begin, end]);
	} else {
		// move stack of n - 1 to spare position, with end position as spare
		move(n - 1, begin, spare, end);

		// move bottom ring from beginning to end, with spare as spare
		move(1, begin, end, spare);

		// move stack of n - 1 to end, with beginning as spare
		move(n - 1, spare, end, begin);

	}
}