
// evaluate a single solution given the amount of players and the target number
function evaluate(players, target) {
	// if # of players is multiple of target num, return players, otherwise return target mod players
	return target % players == 0 ? players : target % players;
}

// determine all solutions for all possible players
function allSolutions(n) {			// n is target number
	for (var i = 1; i <= n; i++) {
		console.log(i + ' players: ' + evaluate(i, n) + ' position');
	}
}