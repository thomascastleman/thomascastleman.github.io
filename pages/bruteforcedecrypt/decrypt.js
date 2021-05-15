var xhttp = new XMLHttpRequest();
var sampleWords = [];
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       sampleWords = xhttp.responseText.split("\n");
    }
};
xhttp.open('GET', 'words.txt', true);
xhttp.send();


var letterEquiv = {0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f', 6: 'g', 7: 'h', 8: 'i', 9: 'j', 10: 'k',
                      11: 'l', 12: 'm', 13: 'n', 14: 'o', 15: 'p', 16: 'q', 17: 'r', 18: 's', 19: 't', 20: 'u',
                      21: 'v', 22: 'w', 23: 'x', 24: 'y', 25: 'z'}

function getInput() {
	var input = String(document.getElementById("input").value);
	document.getElementById("output").innerHTML = runDecryption(input.toLowerCase());
	console.log(sampleWords);
}
		

function decryptLetter(letter, offset) {
	var basedict = {'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9, 'j': 10, 'k': 11, 'l': 12,
                   'm': 13,'n': 14, 'o': 15, 'p': 16, 'q': 17, 'r': 18, 's': 19, 't': 20, 'u': 21, 'v': 22, 'w': 23,
                   'x': 24, 'y': 25, 'z': 26}
    var reversedict = {1: 'a', 2: 'b', 3: 'c', 4: 'd', 5: 'e', 6: 'f', 7: 'g', 8: 'h', 9: 'i', 10: 'j', 11: 'k',
                      12: 'l', 13: 'm', 14: 'n', 15: 'o', 16: 'p', 17: 'q', 18: 'r', 19: 's', 20: 't', 21: 'u',
                      22: 'v', 23: 'w', 24: 'x', 25: 'y', 26: 'z'}
    var num = basedict[letter]; // letter's number value

    num -= offset;
    if (num < 1) {
    	num = 26 - Math.abs(num);
    }
    letter = reversedict[num];
    return letter;
}

function isAlpha(str) {
  return /^[a-zA-Z]+$/.test(str);
}

function decrypt(wordList, offset) {
	var tempPhrase = [];
    for (var i = 0; i < wordList.length; i++) { // for word in list
    	var tempWord = [];
    	for (var k = 0; k < wordList[i].length; k++) { // for char in word
    		if (isAlpha(wordList[i][k])) {
    			tempWord.push(decryptLetter(wordList[i][k], offset));
    		} else {
    			tempWord.push(wordList[i][k]);
    		}
    	}
    	tempPhrase.push(tempWord.join(""));
    }
    return tempPhrase;
}

function getFitnesses(input) { // takes in the list of input
	var resultList = []; // used to keep track of decryption attempts
	var fitList = []; // temp list of fitnesses
	for (var i = 0; i < 26; i++) { // for each possible shift, get fitness
		resultList = decrypt(input, i);
		var currentFitness = 0;

		for (var h = 0; h < resultList.length; h++) { // for every word in decryption attempt
			for (var k = 0; k < sampleWords.length; k++) { // for every word in sampleWords
				console.log(resultList[h], sampleWords[k]);
				if (resultList[h] == sampleWords[k].toString()) { // if they match
					console.log(resultList[h]);
					currentFitness++;
					break; // because it cannot match more than one word
				}
			}
		}
		fitList.push(currentFitness); // add this fitness to the running list
		console.log(currentFitness);
	}
	return fitList;
}

function findFittest(fitnesses) { // finds the highest scoring shift
	var maxFitness = 0;
	var maxIndex = 0;

	for (var i = 0; i < fitnesses.length; i++) {
		if (fitnesses[i] > maxFitness) {
			maxFitness = fitnesses[i];
			maxIndex = i; // record the index of that fitness value; this will be the shift
		}
	}
	return maxIndex;
}

function runDecryption(input) {
	var inputList = input.split(" ");

	var fitnessList = getFitnesses(inputList); // get a list of fitnesses

	var correctShift = findFittest(fitnessList); // find the shift to use for the best fit

	inputList = decrypt(inputList, correctShift);
	var endText = inputList.join(" ");

	document.getElementById("shift").innerHTML = letterEquiv[correctShift].toUpperCase() + " cipher";
	return endText;
}