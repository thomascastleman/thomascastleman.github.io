
function determine_dependent_direction(independent, dependent) {
	if (dependent < 0) {
		dependent = -1 * round(sqrt(2-sq(independent)));
	} else {
		dependent = round(sqrt(2-sq(independent)));
	}
	return dependent;
}

// Ball class
function Ball(tempsize) {
	this.xPos = random(0, width);
	this.yPos = random(0, height);
	this.xDir = Math.random() < 0.5 ? round(random(-1.5, -0.5)) : round(random(0.5, 1.5));
	this.yDir = Math.random() < 0.5 ? round(random(-1.5, -0.5)) : round(random(0.5, 1.5));
	this.size = tempsize;
	this.radius = this.size / 2;
	this.r = random(0, 255);
	this.g = random(0, 255);
	this.b = random(0, 255);

	this.line = function(x, y) { // draw line from ball to a given point (x, y)
		if (lineColor == true) {
			stroke(this.r, this.g, this.b);
		} else {
			stroke(255);
		}
		strokeWeight(2);
		line(this.xPos, this.yPos, x, y);
	}

	this.display = function() { // display ball
		//fill(this.r, this.g, this.b, 150);
		noFill();
		//noStroke();
		stroke(this.r, this.g, this.b);
		ellipse(this.xPos, this.yPos, this.size, this.size);
		stroke(0);
		strokeWeight(3);
		point(this.xPos, this.yPos);
		strokeWeight(1);
	}
	
	this.update = function() { // update position of ball
		this.xPos += this.xDir;
		this.yPos += this.yDir;

		if (this.xPos < 0){
			this.xDir = round(random(0.5, 1.5));
			this.yDir = determine_dependent_direction(this.xDir, this.yDir);
		}
		if (this.xPos > width){
			this.xDir = round(random(-1.5, -0.5));
			this.yDir = determine_dependent_direction(this.xDir, this.yDir);
		}
		if (this.yPos < 0){
			this.yDir = round(random(0.5, 1.5));
			this.xDir = determine_dependent_direction(this.yDir, this.xDir);
		}
		if (this.yPos > height) {
			this.yDir = round(random(-1.5, -0.5));
			this.xDir = determine_dependent_direction(this.yDir, this.xDir);
		}
	}

}