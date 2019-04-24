// GRAVITY SORT

function transform(array, max) {
	var transformed = [];
	for (let threshold = 1; threshold <= max; threshold++) {
		let sum = 0;
		for (let i = 0; i < array.length; i++) {
			if (array[i] >= threshold) {
				sum++;
			}
		}
		transformed.push(sum);
	}
	return transformed;
}

function gravity(array) {
	console.time("Gravity Sort: ");
	var transformed = transform(array, Math.max.apply(null, array));
	master.push(transformed.slice());	
	var result = transform(transformed, array.length);
	master.push(result.slice());
	console.timeEnd("Gravity Sort: ");
}