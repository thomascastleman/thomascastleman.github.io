// ALTERNATE QUICKSORT: HOARE PARTITION SCHEME

function altquicksort(array, lo, hi) {
	if (lo < hi) {
		master.push(array.slice()); // for visualization
		
		var p = altpartition(array, lo, hi);
		altquicksort(array, lo, p);
		altquicksort(array, p + 1, hi);
	}
}

function altpartition(array, lo, hi) {
	var pivot = array[lo]; // set pivot to lowest index
	var i = lo - 1;
	var j = hi + 1;

	while (true) {
		while (true) {
			i++;
			if (array[i] >= pivot) {
				break;
			}
		}
		while (true) {
			j--;
			if (array[j] <= pivot) {
				break;
			}
		}

		if (i >= j) {
			return j;
		}
		swap(array, i, j);
	}
}

function quick(array) {
	console.time("Quicksort time");
	altquicksort(array, 0, array.length);
	console.timeEnd("Quicksort time");
	array.visualize();
}