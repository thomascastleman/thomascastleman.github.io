
function comb(array) {
	console.time("Comb sort time");
	var gap = array.length; 
	var swapped;

	while (true) {
		gap = gap == 1 ? 1 : floor(gap / 2); 			// decrease gap, unless 1
		swapped = false; 								// reset swapped

		for (var i = 0; i < array.length - gap; i++) { 	// for all indices between 0 and where the gap would cause a range error
			while (array[i] > array[i + gap]) { 		// while not sorted
				swap(array, i, i + gap);				// swap
				swapped = true;

				if (i - gap > -1) { 					// if index exists
					i -= gap;							// decrement i
				}
			}
		}

		master.push(array.slice()); // for visualization

		if (swapped == false && gap == 1) {				// gap must be 1 to be sorted
			break;
		}
	}
	console.timeEnd("Comb sort time");
}