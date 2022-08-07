// OPTIMIZED USING INSERTION

function insertion(array) {
	console.time("Insertion time elapsed");
	var pos = 0;	// current index
	var h = 0;		// highest index reached (for optimization)
		while (pos < array.length) {
			if (pos == 0 || array[pos] >= array[pos - 1]) { 	// if first index or properly in position relative to previous
				h++;											// increment highest index
				pos = h;										// move position to highest index
			} else {
				var i = pos - 1;
				while (array[pos] < array[i]) {					// find index where array[pos] will fit
					i--;
				}
				var temp = array[pos];							// temporarily store array[pos]
				array.splice(pos, 1);							// remove array[pos]
				array.splice(i + 1, 0, temp);					// insert value of array[pos] at array[i + 1]
			}

			master.push(array.slice()); // for visualization
		}
	console.timeEnd("Insertion time elapsed");
}