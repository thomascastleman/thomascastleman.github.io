var target = 'Default target string';	// the goal string
var p;									// the population
var genCount = 0;						// number of each generation
var mutation = 1.0;						// mutation rate (percentage)	
var popSize = 800;						// population size
var overall;							// the member with the highest fitness that has been achieved overall

// handles all user input
$(document).ready( function() {
	initial();
	run();

	$('#target').change( function() {
		target = $('#target').val();
		target = target.replace(/\n/g, " ");	// remove newlines
		clearInterval(interval);
		initial();
		run();
	});

	$('#popSize').change( function() {
		popSize = parseInt($('#popSize').val(), 10);
		$('#Size').text(popSize + ' ');
		clearInterval(interval);
		initial();
		run();
	});

	$('#mutation').change( function() {
		mutation = parseFloat($('#mutation').val(), 10);
		$('#mut').text(mutation + '% ');
		clearInterval(interval);
		initial();
		run();
	});

	$("#run").click( function() {
		clearInterval(interval);
		initial();
		run();
	});
});

// refresh important variables to initial values
function initial() {
	p = new Population(popSize);				// initialize population
	genCount = 0;							// reset generation count
	overall = p.population[0];				// initialize overall fittest
}	

// evolve the target string using given inputs (mutation, size, target)
var interval;
function run() {
	$('#result').text('');									// clear result
	interval = setInterval( function() {
		p.calcPopulationFitness();							// calculate all fitnesses
		var fittest = p.getFittestMember();					// get fittest member of population

		if (fittest.fitness > overall.fitness) {			// if fittest in current generation is fitter than the current overall fittest member
			overall = fittest;								// update overall fittest
		}

		// update text
		$('#best').text(overall.value);						// fittest attempt so far
		$('#genCount').text('Generation ' + genCount);		// number of current generation
		$('#fitness').text('Average Percent Fitness: ' + Math.ceil((p.avgFitness / target.length) * 100) + '%');	// the average fitness of the current generation

		$('#result').prepend(fittest.value + '<br>');		// add fittest of current generation to result

		if (fittest.value == target) {						// if target reached or run is called again
			clearInterval(interval);						// break
		}

		p.calculateNextGen();								// calculate next generation
		genCount++;
	}, 0);
}

// function to replace a character at a given index in a string
String.prototype.replaceAt = function(index, char) {
	return this.substr(0, index) + char + this.substr(index + char.length);
}

// Member class to handle attributes of individual members of each generation
function Member() {
	this.fitness;			// fitness score of member
	this.value = '';		// string value of member

	// randomize initial value
	this.initialize = function() {
		for (var i = 0; i < target.length; i++) {
			this.value += String.fromCharCode((Math.random() * 95) + 32);
		}
	}

	// calculates individual fitness of a member
	this.calcFitness = function() {
		this.fitness = 0;
		for (var i = 0; i < this.value.length; i++) {
			if (this.value[i] == target[i]) {
				this.fitness++;
			}
		}
	}

	// at random, randomizes a character of member string
	this.mutate = function() {
		for (var i = 0; i < this.value.length; i++) {
			if (Math.random() < mutation / 100) {		// using mutation factor
				this.value = this.value.replaceAt(i, String.fromCharCode((Math.random() * 95) + 32));
			}
		}
		return this.value;
	}
}

// Population class to handle the selection, reproduction, and mutation processes of an entire generation
function Population(size) {
	this.population = [];		// array to store members of population
	this.avgFitness;			// the average fitness of a generation

	// initialize population
	for (var i = 0; i < size; i++) {
		this.population.push(new Member());
		this.population[i].initialize();
	}

	// calculate the fitness of every member of population
	this.calcPopulationFitness = function() {
		this.avgFitness = 0;
		for (var i = 0; i < this.population.length; i++) {
			this.population[i].calcFitness();
			this.avgFitness += this.population[i].fitness;
		}
		this.avgFitness = this.avgFitness / this.population.length;		// get average fitness of that generation
	}

	// apply mutation to all members of population
	this.applyMutation = function() {
		for (var i = 0; i < this.population.length; i++) {
			this.population[i].mutate();
		}
	}

	// return the member with highest fitness
	this.getFittestMember = function() {
		var max = this.population[0];
		for (var i = 0; i < this.population.length; i++) {
			if (this.population[i].fitness > max.fitness) {
				max = this.population[i];
			}
		}
		return max;
	}

	// select parent from population using rejection sampling to favor fitter members
	this.getParent = function(maxFitness) {
		var num, index;
		while (true) {
			num = Math.floor(Math.random() * maxFitness);
			index = Math.floor(Math.random() * this.population.length);
			if (this.population[index].fitness > num) {
				break;
			}
		}
		return this.population[index];
	}

	// select two parents via rejection sampling and cross their DNA to produce child
	this.getChild = function() {
		var parentA = this.getParent((this.getFittestMember()).fitness);
		var parentB = this.getParent((this.getFittestMember()).fitness);

		var mid = Math.floor(Math.random() * target.length);		// generate random index to split parent DNA

		var child = new Member();
		child.value = parentA.value.substr(0, mid + 1) + parentB.value.substr(mid + 1);		// crossover between parents
		return child;
	}

	// populate the next generation
	this.calculateNextGen = function() {
		var nextGen = [];										// temporary generation to hold values
		for (var i = 0; i < this.population.length; i++) {
			nextGen.push(this.getChild());						// push child members to new population
		}
		this.population = nextGen;								// transfer new population over to this.population
		this.applyMutation();									// mutate
	}
}