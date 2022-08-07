
var points = [];
var amount = 15;

function setup() {
	var canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0);

	rectMode(CENTER);

	for (var i = 0; i < amount; i++) {
		points.push(new Point());
	}

}

function draw() {
	background(35);

	for (var i = 0; i < points.length; i++) {
		points[i].lines(i);
		points[i].display();
		points[i].update();
	}
}


function Point() {
	this.position = createVector(random(0, width), random(0, height));
	this.velocity = p5.Vector.random2D().mult(2.5);

	this.update = function() {
		this.position.add(this.velocity);

		if (this.position.x > width) {
			this.position.x %= width;
		} else if (this.position.x < 0) {
			this.position.x = width;
		}

		if (this.position.y > height) {
			this.position.y %= height;
		} else if (this.position.y < 0) {
			this.position.y = height;
		}
	}

	this.lines = function(index) {
		for (var i = index; i < points.length; i++) {
			var distance = dist(points[i].position.x, points[i].position.y, this.position.x, this.position.y);
			if (distance < 400) {
				stroke(map(distance, 0, 400, 255, 50));
				line(points[i].position.x, points[i].position.y, this.position.x, this.position.y);
			}
		}
	}

	this.display = function() {
		rect(this.position.x, this.position.y, 7, 7);
	}
}