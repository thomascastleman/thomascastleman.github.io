
var record; // record of order in which positions were taken out

function calc(n) {
	for (var i = 1; i <= n; i++) {
		var sol = josephus(i);
		// if (sol == 0) {
			console.log(i + " people: " + sol + "th position");
		// }
	}
}


function josephus(n) {
	record = [];
	// initialize circle, all states are alive (1)
	var circle = [];
	for (var i = 0; i < n; i++) {
		circle.push(1);
	}

	var current = 0;
	var nextAlive;

	while (true) {
		nextAlive = current + 1 == n ? 0 : current + 1;
		while (circle[nextAlive] != 1) {
			nextAlive = nextAlive + 1 == n ? 0 : nextAlive + 1;
		}

		if (nextAlive == current) {
			return current;
		}

		circle[nextAlive] = 0;
		record.push(current);
		record.push(nextAlive);

		current = nextAlive;
		while (circle[current] != 1) {
			current = current + 1 == n ? 0 : current + 1;
		}
	}
}