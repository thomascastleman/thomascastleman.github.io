function getInput() {
	var input = String(document.getElementById("input").value);
	var keyword = String(document.getElementById("keyword").value);

	input = input.toLowerCase();
	keyword = keyword.toLowerCase();
	if (keyword.includes(" ")) {
		document.getElementById("output").innerHTML = "Please Enter A Legitimate Keyword";
	} else {
		document.getElementById("output").innerHTML = runEncryption(input, keyword);
	}
}

function encrypt(letter, offset) {
	var basedict = {'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9, 'j': 10, 'k': 11, 'l': 12,
                   'm': 13,'n': 14, 'o': 15, 'p': 16, 'q': 17, 'r': 18, 's': 19, 't': 20, 'u': 21, 'v': 22, 'w': 23,
                   'x': 24, 'y': 25, 'z': 26}
    var reversedict = {1: 'a', 2: 'b', 3: 'c', 4: 'd', 5: 'e', 6: 'f', 7: 'g', 8: 'h', 9: 'i', 10: 'j', 11: 'k',
                      12: 'l', 13: 'm', 14: 'n', 15: 'o', 16: 'p', 17: 'q', 18: 'r', 19: 's', 20: 't', 21: 'u',
                      22: 'v', 23: 'w', 24: 'x', 25: 'y', 26: 'z'}
    var numEquiv = basedict[letter]; // convert to number value
    numEquiv += offset; // apply shift
    if (numEquiv > 26) { // shift greater than alphabet length loops back
    	numEquiv %= 26;
    }
    letter = reversedict[numEquiv]; // convert to letter value
    return letter;
}

function isAlpha(str) {
  return /^[a-zA-Z]+$/.test(str);
}

function runEncryption(input, keyword) {
	var shiftValues = {'a': 0, 'b': 1, 'c': 2, 'd': 3, 'e': 4, 'f': 5, 'g': 6, 'h': 7, 'i': 8, 'j': 9, 'k': 10, 'l': 11,
                     'm': 12,'n': 13, 'o': 14, 'p': 15, 'q': 16, 'r': 17, 's': 18, 't': 19, 'u': 20, 'v': 21, 'w': 22,
                     'x': 23, 'y': 24, 'z': 25}

	var inputList = input.split(" "); // split input by spaces

	var shiftList = [];

	for (var i = 0; i < keyword.length; i++) { // initialize an array of the shift values from the letters in keyword
		shiftList.push(shiftValues[keyword[i]]);
	}

	var encryptedLine = []; // the entire line, encrypted

	for (var i = 0; i < inputList.length; i++) { // for each word in input
		var keywordIndex = 0;
		var encryptedWord = ""; 												// the current word, encrypted
		for (var k = 0; k < inputList[i].length; k++) { 						// for each character in word
			keywordIndex = keywordIndex >= keyword.length ? 0 : keywordIndex;
			if (!isAlpha(inputList[i][k])) { 									// if char not in alphabet
				encryptedWord += inputList[i][k]; 								// append char to encrypted word
			} else {
				encryptedWord += encrypt(inputList[i][k], shiftList[keywordIndex]); // append encrypted char by offset from keyword to encrypted word
			}
			keywordIndex++;
		}
		encryptedLine.push(encryptedWord); // push word to full encrypted line
	}
	return encryptedLine.join(" ");
}