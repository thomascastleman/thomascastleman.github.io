bdays = [];

// get txt file of 'bene' rhymes
var req = new XMLHttpRequest();
req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       bdays = req.responseText.split("\n");
    }
};
req.open('GET', 'bdays.txt', true);
req.send();


$(document).ready( function() {
	setup();


	$('#input').change( function() {
		date = $(this).val();

		search(date);

	});
});


var date;
var datesToPersons;

function setup() {

	datesToPersons = new BirthdayMap();
	datesToPersons.populate(bdays);

	d = new Date();
	date = d.toString().substring(4, 10);

	search(date);
}

function search(date) {

	birthdays = datesToPersons.get(date);
	
	if (birthdays != null) {
		display(date, birthdays);
	} else {
		datesToPersons.searchByKeyword(date)
	}
}

function display(date, bdays) {
	$('#date').text(date);
	$('#birthdays').empty();

	if (bdays == null) {
		$('#birthdays').text("No Birthdays Found");
	} else {
		for (var i = 0; i < bdays.length; i++) {
			$('#birthdays').append("<span>" + bdays[i] + "</span><br>");
		}
	}
}

function BirthdayMap() {

	this.keys = [];
	this.values = [];

	this.add = function(key, value) {

		if (this.get(key) == null) {
			this.keys.push(key);
			this.values.push([value]);
		} else {
			this.get(key).push(value);
		}
	}

	this.get = function(key) {
		if (this.keys.indexOf(key) == -1) {
			return null;
		} else {
			return this.values[this.keys.indexOf(key)];
		}
	}

	this.populate = function(bdays) {
		for (var i = 0; i < bdays.length; i++) {
			date = bdays[i].substring(0, 6);
			person = bdays[i].substring(7);

			this.add(date, person);
		}
	}


	this.searchByKeyword = function(keyword) {
		keywords = keyword.split(" ")
		matches = [];
		for (var i = 0; i < this.values.length; i++) {
			for (var k = 0; k < this.values[i].length; k++) {
				for (var j = 0; j < keywords.length; j++) {
					if (~(this.values[i][k].toLowerCase().indexOf(keywords[j].toLowerCase()))) {
						copy = this.values[i].slice()
						match = [this.keys[i], this.values[i][k], copy.splice(copy.indexOf(this.values[i][k]), 1)];
						if (matches.indexOf(match) == -1) {
							matches.push(match);
							console.log("Match: " + this.values[i][k] + " on " + this.keys[i]);
							console.log("On same day: " + copy.splice(copy.indexOf(this.values[i][k]), 1));
						}
					}
				}
			}
		}
	}
}