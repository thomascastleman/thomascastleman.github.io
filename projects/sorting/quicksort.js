

function quicksort(array) {
	partition(array, 0, array.length - 1);
}

function scaleValue(value, currentMin, currentMax, resultMin, resultMax) {
	return (((resultMax - resultMin) * (value - currentMin)) / (currentMax - currentMin)) + resultMin;
}

function partition(array, startIndex, endIndex) {
	if (endIndex - startIndex >= 1) { // arrays of 1 or 0 elements are already sorted
		var pivot = array[Math.round(scaleValue(Math.random(), 0, 1, startIndex, endIndex))]; // choose random index

		var l = startIndex;
		var u = endIndex;
		while (l < u) { // until l == u
			while (array[l] < pivot) { // find low value greater than pivot
				l++;
			}
			while (array[u] > pivot) { // find high value lower than pivot
				u--;
			}
			swap(array, l, u); // swap those values
			//console.log(array);
		}

		console.log("This pivot: " + pivot);
		for (var i = startIndex; i <= endIndex; i++) {
			console.log(array[i]);
		}


		partition(array, startIndex, l - 1); // lower half
		partition(array, u + 1, endIndex); // upper half
	}
}