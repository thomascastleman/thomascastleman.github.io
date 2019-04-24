

$(document).ready( function() {

	$('.theme').click( function() {
		$(this).find('.content').slideToggle();
	});

	$('#expandAll').click( function() {
		console.log($('#allThemes').find('.content'));

		if ($('.content').is(':visible')) {
			$('.content').slideUp();
		} else {
			$('.content').slideDown();
		}
	
	});

});