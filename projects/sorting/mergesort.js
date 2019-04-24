function mergesort(array) {
	console.time("Merge sort time");
	mSplit(array, 0, array.length);
	console.timeEnd("Merge sort time");
}

// splits an array in half and calls itself on the halves
function mSplit(array, lowIndex, highIndex) {
	if (highIndex - lowIndex > 1) { 						// section must be 2 elements or greater to be further split
		var middleIndex = Math.floor((highIndex + lowIndex) / 2) // floored average of two indices

		mSplit(array, lowIndex, middleIndex); 				// section from low up to and excluding middle
		mSplit(array, middleIndex, highIndex); 				// section from middle up to and excluding high

		merge(array, lowIndex, middleIndex, middleIndex, highIndex); // merge those two sections

		master.push(array.slice()); // for visualization
	}
}

// merges two sections of an array, from low1 to (not including) high1 with low2 to (not including) high2
function merge(array, low1, high1, low2, high2) {
	// used to loop through sections of the array
	var i = low1;
	var k = low2;
	var newArr = []; // working array

	while (i < high1 || k < high2) { 						// while at least one section is not empty
		if (i == high1) {
			for (var index = k; index < high2; index++) { 	// push all remaining from k to high2
				newArr.push(array[index]);
			}
			break;
		} else if (k == high2) {
			for (var index = i; index < high1; index++) { 	// push all remaining from i to high1
				newArr.push(array[index]);
			}
			break;
		}

		if (array[i] < array[k]) { 							// push the lower value to newArr
			newArr.push(array[i]);
			i++;
		} else {
			newArr.push(array[k]);
			k++;
		}
	}

	for (var j = low1; j < high2; j++) { 	// for all values in both ranges
		array[j] = newArr.shift(); 			// change to new sorted values
	}
}