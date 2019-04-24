

$(document).ready( function() {
	updateAge();
});

function updateAge() {

	var bYear = 2000;
	var today = new Date();
	var curYear = today.getFullYear();

	var age = curYear - bYear;

	if (today.getMonth() < 7) {
		age--;
	} else if (today.getMonth() == 7) {
		if (today.getDate() < 24) {
			age--;
		}
	}

	$('#age').text(age);
	console.log(age);
}