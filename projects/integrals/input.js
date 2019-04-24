

$(document).ready( function() {
	$('#xMintext').text(xMin);
	$('#xMaxtext').text(xMax);
	$('#yMintext').text(yMin);
	$('#yMaxtext').text(yMax);

	$('#aText').text(a);
	$('#bText').text(b);

	$('#xMin').change( function() {
		xMin = parseInt($(this).val(), 10);
		$('#xMintext').text(xMin);
		vis(f, a, b);
	});

	$('#xMax').change( function() {
		xMax = parseInt($(this).val(), 10);
		$('#xMaxtext').text(xMax);
		vis(f, a, b);
	});

	$('#yMin').change( function() {
		yMin = parseInt($(this).val(), 10);
		$('#yMintext').text(yMin);
		vis(f, a, b);
	});

	$('#yMax').change( function() {
		yMax = parseInt($(this).val(), 10);
		$('#yMaxtext').text(yMax);
		vis(f, a, b);
	});

	$('#a').change( function() {
		a = parseFloat($(this).val());
		$('#aText').text(a);
		vis(f, a, b);
	});

	$('#b').change( function() {
		b = parseFloat($(this).val());
		$('#bText').text(b);
		vis(f, a, b);
	});

	$('#visualize').click( function() {
		vis(f, a, b);
	});

	$('#auto').click( function() {
		autoWindow();
	});

	$('#delay').change( function() {
		delay = parseInt($(this).val(), 10);
		vis(f, a, b);
	});
});