
var set;

function toBin(int) {
	return int.toString(2);
}

function powerset(set) {
	var powerset = [];
	for (var i = 0; i < Math.pow(2, set.length); i++) {
		var key = toBin(i);		// get binary equivalent
		var subset = [];

		// loop backwards through key, adding included elements of set to subset
		for (var j = set.length - 1, k = key.length - 1; j >= 0; j--, k--) {
			if (key[k] == undefined) {
				break;
			} else if (key[k] == "1") {
				subset.push(set[j]);
			}
		}
		powerset.push(subset);		// add subset to powerset
	}
	return powerset;
}

function run(set) {
	var p = powerset(set);
	$('#output').text("Power Set: (length: " + Math.pow(2, set.length) + " elements)");
	$('#output').append("<br>");
	for (var i = 0; i < p.length; i++) {
		$('#output').append("{" + p[i] + "}<br>");
	}
}

$(document).ready( function() {
	$('#input').change( function() {
		set = ($('#input').val()).split(' ');
		for (var i = 0; i < set.length; i++) {
			set[i] = parseInt(set[i], 10);
			
		}
		run(set);
	});
});