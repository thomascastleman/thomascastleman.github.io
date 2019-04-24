

function cocktail(array) {
	console.time("Cocktail shaker time");
	var swapped;
	var lowIndex = 0; // first index
	var highIndex = array.length - 1; // last index

	while (lowIndex < highIndex) {
			swapped = false;
			// from low to high
			for (var i = lowIndex; i < highIndex; i++) {
				if (array[i] > array[i + 1]) {
					swap(array, i, i + 1);
					swapped = true;
				}
			}
			highIndex--;

			// if no swaps made 
			if (swapped == false) {
				break;
			}
			swapped = false; // reset swapped

			// from high to low
			for (var i = highIndex; i > lowIndex; i--) {
				if (array[i] < array[i - 1]) {
					swap(array, i, i - 1);
					swapped = true;
				}
			}
			lowIndex++;

			master.push(array.slice()); // for visualization

			if (swapped == false) {
				break;
			}
		}
	console.timeEnd("Cocktail shaker time");
}