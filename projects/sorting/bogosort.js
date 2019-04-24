
function isSorted(array) {
	for (var i = 0; i < array.length; i++) {
		if (array[i] > array[i + 1]) {
			return false;
		}
	}
	return true;
}

function bogosort(array) {
	console.time("Run time");
	while(!isSorted(array)) { // while array is not sorted
		array.sort( function() { // randomize array
			return 0.5 - Math.random()
		});
	}
	console.timeEnd("Run time");
	return array;
}

function bogobogosort(array) {
	console.time("Total runtime");
	var arr = [];
	for (var i = 0; i < array.length; i++) {
		arr.push(array[i]); // add array[i] to arr
		bogosort(arr); // bogosort arr
	}
	console.timeEnd("Total runtime");
	return arr;
}

// visualized version
function visualBogo(array) {
	setInterval( function() {
		if (!isSorted(array)) {
			array.sort( function() {
				return 0.5 - Math.random();
			});
			array.visualize();
		}
	}, 500);
	return array;
}