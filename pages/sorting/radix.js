
function radix(array) {
	console.time("Radix time");
	var m = 10;
	var n = 1;
	var sortingArray;

	var max = Math.max.apply(null, array);
	while (n.toString().length <= max.toString().length) { // while n has <= the amount of digits of the max value
		// initialize sorting list of length 10
		sortingArray = [];
		for (var i = 0; i < 10; i++) {
			sortingArray.push(new Array());
		}

		// fill sortingArray
		for (var i = 0; i < array.length; i++) {
			var index = floor((array[i] % m) / n); // calculate index
			sortingArray[index].push(array[i]); // push value to its place in sortingArray
		}

		array = [];
		// go through sortingArray and push the values to array in that order
		for (var i = 0; i < sortingArray.length; i++) {
			for (var k = 0; k < sortingArray[i].length; k++) {
				array.push(sortingArray[i][k]);
			}
		}

		// increment m and n
		m *= 10;
		n *= 10;

		master.push(array.slice()); // for visualization
	}
	console.timeEnd("Radix time");
}
