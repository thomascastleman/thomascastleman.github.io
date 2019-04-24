

$(document).ready( function() {

	$('#run').click( function() {
		run();
	});

	$('#seed').change( function() {
		seed = parseInt($(this).val(), 10);
		run();
	});

	$('#mod').change( function() {
		mod = parseInt($(this).val(), 10);
		run();
	});

	$('#layers').change( function() {
		layers = parseInt($(this).val(), 10);
		layers = layers > 1030 ? 1030 : layers;
		run();
	});

	$('#txt').click( function() {
		if (txt) {
			txt = false;
		} else {
			txt = true;
		}
		run();
	})
});