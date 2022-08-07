
$(document).ready( function() {
	$('#slow').click( function() {
		cycle(n);
	});

	$('#end').click( function() {
		clearInterval(interval);
	});

	$('#pts').change( function() {
		clearInterval(interval);
		n = parseInt($(this).val(), 10);
		displayLines(n, t);
	});

	$('#mult').change( function() {
		clearInterval(interval);
		t = parseFloat($(this).val());
		displayLines(n, t);
	});

	$('#inc').change( function() {
		inc = parseFloat($(this).val());
		cycle(n);
	});
});