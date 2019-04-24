
var numDropDowns = 9;

$(document).ready( function() {

	$('.dropdown').hover(
		function () {
			$(this).children('.sub-menu').slideDown(200);
		},

		function() {
			$(this).children('.sub-menu').slideUp(200);
		}
	);

	$( window ).resize(function() {
			var ddownWidth = $(window).width() / numDropDowns - 10;
			
			$(".dropdown").css("width", ddownWidth + "px");
			$(".sub-menu").css("width", ddownWidth + "px");

			var wid = $("nav li ul").parent().height();
			wid += $("nav li ul").css("padding");
			$("nav li ul").css("top", wid + "px");

			// update sketch:
			setup();
	});
	$(window).resize();

});