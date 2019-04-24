var arrSize = 200;
var array = [];
var delay = 50;
var numRange = 1000;

var r = {};
var g = {};
var b = {};


function setup() {
	var canvas = createCanvas(windowWidth, windowHeight);
	canvas.style('z-index', '-1');
	canvas.position(0, 0);

	rectMode(CORNERS);
	background(0);
	fill(255);
	noStroke();
	noLoop();
}

function getColorRanges() {
	var low = Math.floor(Math.random() * 255);
	var high = Math.floor(Math.random() * 255);

	console.log("low: " + low);
	console.log("high: " + high);
	return {l: low, h: high};
}

// swaps two indices in a given array
function swap(array, index1, index2) {
	var temp = array[index1];
	array[index1] = array[index2];
	array[index2] = temp;
}

// refreshes an array to random values
Array.prototype.refresh = function() {
	while (this.length > 0) {
		this.pop();
	}
	var nums = [];
	for (var i = 0; i < arrSize; i++) {
		nums.push(i);
	}
	
	while (nums.length > 0) {
		var randIndex = Math.floor(Math.random() * nums.length);
		this.push(nums[randIndex]);
		nums.splice(randIndex, 1);
	}
}

// visualizes an array
Array.prototype.visualize = function() {
	background(0); // refresh background
	var max = Math.max.apply(null, this); // get maximum value
	for (var i = 0; i < this.length; i++) {
		// fill(map(this[i], 0, arrSize, 255, 0), 0, map(this[i], 0, arrSize, 0, 255));
		// fill(map(this[i], 0, arrSize, 255, 0), map(this[i], 0, arrSize, 0, 255), map(this[i], 0, arrSize, 0, 255));
		fill(map(this[i], 0, arrSize, r.l, r.h), map(this[i], 0, arrSize, g.l, g.h), map(this[i], 0, arrSize, b.l, b.h));
		rect(i * (width / this.length), height, (i + 1) * (width / this.length), height - map(this[i], 0, max, 0, height)); // draw rectangle from corner to corner
	}
}

// visualizes each array that the sorting algorithm passed through, at a given delay
var interval;
var master = [];
function visualizeMaster(delay) {
	r = getColorRanges();
	g = getColorRanges();
	b = getColorRanges();
	
	interval = setInterval( function() {
		if (master.length == 1) {			// if on last array, show in green
			fill(0, 255, 0);
			(master.shift()).visualize();
			fill(255);
		} else if (master.length > 0) {
			(master.shift()).visualize();
		}
	}, delay);
}

function runSortingAlg(alg) {
	clearInterval(interval);						// refresh interval
	array.refresh();								// refresh array
	master = [];									// refresh master
	alg(array);									
	visualizeMaster(delay);
}

$(document).ready( function() {
	
	$('#arrSize').change( function() {
		arrSize = parseInt($('#arrSize').val(), 10);
		arrSize = (arrSize > 3000 ? 3000 : (arrSize < 10 ? 10 : arrSize));		// restricts min and max array sizes

		if (arrSize < 200) {
			stroke(0);
		} else {
			noStroke();
		}

		array.refresh();
	});

	$('#delay').change( function() {
		delay = parseInt( $('#delay').val(), 10);
	});

	// SORTS:
	$('#radix').click( function() {
		$('#sortName').text('Radix LSD');
		runSortingAlg(radix);
	});
	$('#quicksort').click( function() {
		$('#sortName').text('QuickSort');
		runSortingAlg(quick);
	});
	$('#mergesort').click( function() {
		$('#sortName').text('Merge Sort');
		runSortingAlg(mergesort);
	});
	$('#insertionsort').click( function() {
		$('#sortName').text('Insertion Sort');
		runSortingAlg(insertion);
	});
	$('#combsort').click( function() {
		$('#sortName').text('Comb Sort');
		runSortingAlg(comb);
	});
	$('#cocktailsort').click( function() {
		$('#sortName').text('Cocktail Shaker Sort');
		runSortingAlg(cocktail);
	});
	$('#gravitysort').click( function() {
		$('#sortName').text('Gravity Sort');
		runSortingAlg(gravity);
	});
	
	$('#mergesort').click();
});