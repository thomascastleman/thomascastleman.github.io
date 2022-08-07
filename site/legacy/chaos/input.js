$(document).ready( function() {
	$('#ptText').text(n);
	$('#frText').text(fraction);
	$('#plText').text(placesAway);
	$('#bText').text(lookBehind);

	run(sp);

	$('#pts').change( function() {
		stop();
		n = parseInt($(this).val(), 10);
		$('#ptText').text(n);
		setup();
		run(sp);
	});

	$('#frac').change( function() {
		var f = $(this).val().split("/");
		stop();
		fraction = parseInt(f[0]) / parseInt(f[1]);
		$('#frText').text(fraction.toFixed(3));
		setup();
		run(sp);
	});

	$('#places').change( function() {
		stop();
		placesAway = [];
		var split = $(this).val().split(" ");
		for (var i = 0; i < split.length; i++) {
			placesAway.push(parseInt(split[i], 10));
		}
		if (placesAway.length > lookBehind) {
			// placesAway = [0];
			lookBehind = placesAway.length;
			$('#bText').text(lookBehind);
		}
		$('#plText').text(placesAway);
		setup();
		run(sp);
	});

	$('#behind').change( function() {
		stop();
		lookBehind = parseInt($(this).val(), 10);
		if (lookBehind >= n) {
			lookBehind = n - 1;
		}
		if ((lookBehind > placesAway.length && placesAway.length != 1) || (lookBehind < placesAway.length && lookBehind != 0)) {
			lookBehind = placesAway.length;
		}
		$('#bText').text(lookBehind);
		setup();
		run(sp);
	});

	$('#run').click( function() {
		setup();
		run(sp);
	});

	$('#end').click( function() {
		stop();
	});
});