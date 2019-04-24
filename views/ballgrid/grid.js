function setup() {
	var canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0);
	background(51);
}

var detail = 10;

function draw() {
	background(51);
	fill(255);
	noStroke();
	for (var i = ((width / detail) / 2); i < width; i += width / detail) {
		for (var k = ((width / detail) / 2); k < height; k += width / detail) {
			size = map(distance(i, k, mouseX, mouseY), 0, distance(0, 0, displayWidth, displayHeight), width / detail, 5); // derive size from distance to mouse position
			fill(0, map(abs(mouseX - i), 0, width, 255, 50), map(abs(mouseY - k), 0, height, 255, 50)); // derive fill from x and y distances, no red
			ellipse(i, k, size, size);
		}
	}
}

function distance(xP1, yP1, xP2, yP2) {
	return round(sqrt(sq(xP1 - xP2) + sq(yP1 - yP2)));
}

function keyTyped() {
	if (key == " ") {
		detail += 5;
	}
	if (detail > 65) {
		detail = 10;
	}

}