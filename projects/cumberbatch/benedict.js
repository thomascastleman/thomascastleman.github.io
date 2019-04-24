var bene = [];
var dict = [];

var cumber = [];
var batch = [];

// get txt file of 'bene' rhymes
var one = new XMLHttpRequest();
one.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       bene = one.responseText.split("\n");
    }
};
one.open('GET', 'bene.txt', true);
one.send();

// get txt file of 'dict' rhymes
var two = new XMLHttpRequest();
two.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       dict = two.responseText.split("\n");
    }
};
two.open('GET', 'dict.txt', true);
two.send();

// get txt file of 'cumber' rhymes
var three = new XMLHttpRequest();
three.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       cumber = three.responseText.split("\n");
    }
};
three.open('GET', 'cumber.txt', true);
three.send();

// get txt file of 'batch' rhymes
var four = new XMLHttpRequest();
four.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       batch = four.responseText.split("\n");
    }
};
four.open('GET', 'batch.txt', true);
four.send();

// generates new name
function generate() {
	return bene[Math.floor(Math.random() * bene.length)] + dict[Math.floor(Math.random() * dict.length)] + ' ' + cumber[Math.floor(Math.random() * cumber.length)] + batch[Math.floor(Math.random() * batch.length)];
}

$(document).ready( function() {
	$('#generate').click( function() {
		$('#text').text(generate());
	});
});










