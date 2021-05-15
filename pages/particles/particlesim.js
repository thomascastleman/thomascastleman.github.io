var particleArray = [];
var amount = 20;

function setup() {
	createCanvas(900, 600);
	frameRate(60);
	stroke(0);

	for (var i = 0; i < amount; i++) {
		particleArray.push(new Particle(random(5, 50)));
	}

	// prevent overlapping on at initial position
	for (var i = 0; i < particleArray.length; i++) {
		for (var k = 0; k < particleArray.length; k++) {
			if (dist(particleArray[i].location.x, particleArray[i].location.y, particleArray[k].location.x, particleArray[k].location.y) < (particleArray[i].size / 2) + (particleArray[k].size / 2)) { // if already contacting
				particleArray[i].location.add(particleArray[i].size / 2, particleArray[i].size / 2);
				particleArray[k].location.sub(particleArray[k].size / 2, particleArray[k].size / 2);
			}
		}
	}

	particleArray[0].infected = true;
}

function draw() {
	background(200);

	for (var i = 0; i < particleArray.length; i++) {
		particleArray[i].display();
		particleArray[i].update();
	}

}



function Particle(tempsize) {
	//this.fillColor = color(random(0, 255), random(0, 255), random(0, 255));
	this.size = tempsize
	this.location = createVector(random(0, width), random(0, height));
	this.velocity = p5.Vector.random2D().mult(5); //createVector(random(-10, 10), random(-10, 10));
	this.collision;

	this.infected = false;


	this.update = function() {
		this.location.add(this.velocity);


		for (var i = 0; i < particleArray.length; i++) {
			if (dist(this.location.x, this.location.y, particleArray[i].location.x, particleArray[i].location.y) < (this.size / 2) + (particleArray[i].size / 2)) { // if another particle is in contact with this particle
				if (this.location != particleArray[i].location) { // if it is not itself
					// var x = -1 * (((this.location.x * this.size) + (particleArray[i].location.x * particleArray[i].size)) / (this.size + particleArray[i].size)) + this.location.x;
					// var y = -1 * (((this.location.y * this.size) + (particleArray[i].location.y * particleArray[i].size)) / (this.size + particleArray[i].size)) + this.location.y;
					// this.collision = createVector(x, y);
					// console.log(this.collision);

					// swap them
					var tempVelocity = this.velocity.copy();
					this.velocity = particleArray[i].velocity;
					particleArray[i].velocity = tempVelocity;

					this.location.add(this.velocity);
					particleArray[i].location.add(particleArray[i].velocity);


					if (this.infected) {
						particleArray[i].infected = true;
					} else if (particleArray[i].infected) {
						this.infected = true;
					}

					// // collision angle
					// this.velocity.mult(this.collision);
				}
			}
		}
		if ((this.location.x - (this.size / 2) < 0 && this.velocity.x < 0) || (this.location.x + (this.size / 2) > width && this.velocity.x > 0)) {
			this.velocity.x *= -1;
		}
		if ((this.location.y - (this.size / 2) < 0 && this.velocity.y < 0) || (this.location.y + (this.size / 2) > height && this.velocity.y > 0)) {
			this.velocity.y *= -1;
		}

	}

	this.display = function() {
		//fill(this.fillColor);
		if (this.infected) {
			fill(255, 0, 0);
		} else {
			fill(255);
		}
		stroke(0);
		ellipse(this.location.x, this.location.y, this.size, this.size);

		for (var i = 0; i < particleArray.length; i++) {
			if (this.infected && particleArray[i].infected) {
				stroke(255, 0, 0, 50);
				line(this.location.x, this.location.y, particleArray[i].location.x, particleArray[i].location.y);
			}
		}
	}
}