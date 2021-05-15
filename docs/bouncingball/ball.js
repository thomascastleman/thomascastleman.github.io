function determine_dependent_direction(independent, dependent) {
	if (dependent < 0) {
		dependent = -1 * round(sqrt(25-sq(independent)));
	} else {
		dependent = round(sqrt(25-sq(independent)));
	}
	return dependent;
}

// Ball class
function Ball(tempsize) {
	this.xPos = width / 2;
	this.yPos = height / 2;
	this.xDir = Math.random() < 0.5 ? round(random(-5, -1)) : round(random(1, 5));
	this.yDir = Math.random() < 0.5 ? round(random(-5, -1)) : round(random(1, 5));
	this.size = tempsize;

	this.display = function() {
		//stroke(0, map(this.yPos, 0, height, 0, 255), map(this.xPos, 0, width, 0, 255));
		stroke(0);
		fill(0, map(this.yPos, 0, height, 0, 255), map(this.xPos, 0, width, 0, 255));
		ellipse(this.xPos, this.yPos, this.size, this.size);
	}
	
	this.move = function() {
		this.xPos += this.xDir;
		this.yPos += this.yDir;

		if (this.xPos < 0){
			this.xDir = round(random(1, 5));
			this.yDir = determine_dependent_direction(this.xDir, this.yDir);
		}
		if (this.xPos > width){
			this.xDir = round(random(-5, -1));
			this.yDir = determine_dependent_direction(this.xDir, this.yDir);
		}
		if (this.yPos < 0){
			this.yDir = round(random(1, 5));
			this.xDir = determine_dependent_direction(this.yDir, this.xDir);
		}
		if (this.yPos > height) {
			this.yDir = round(random(-5, -1));
			this.xDir = determine_dependent_direction(this.yDir, this.	xDir);
		}
	}

}