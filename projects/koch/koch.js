
var depth = 4;

function setup() {
	var canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0);

	angleMode(DEGREES);

	stroke(0, 255, 0);
	strokeWeight(0.5);

	drawSnowflakes();
}

function drawSnowflakes() {

	background(0);

	for (var i = 12.5; i < height * 4; i *= 2) {
		kochSnowflake(width / 2, height / 2, i, depth);
	}


}

function keyPressed() {
	depth++;

	if (depth > 6) {
		depth = 1;
	}

	drawSnowflakes();
}

// draw a single koch curve of a given length, with a given depth
function kochCurve(length, depth, basedepth) {
	if (depth < basedepth) {
		let onethird = length / 3.0;

		kochCurve(onethird, depth + 1, basedepth);

		push();
			translate(0, onethird);
			rotate(-60);

			kochCurve(onethird, depth + 1, basedepth);

			push();
				translate(0, onethird);
				rotate(120);

				kochCurve(onethird, depth + 1, basedepth);

				push();
					translate(0, onethird);
					rotate(-60);

					kochCurve(onethird, depth + 1, basedepth);

				pop();
			pop();
		pop();

	} else {
		line(0, 0, 0, length);
	}
}

// draw koch snowflake at given x,y, with given sidelength and depth
function kochSnowflake(centerX, centerY, sidelength, basedepth) {

	push();
		// good ole trigonometry (center snowflake)
		translate(centerX, centerY + (sidelength / Math.sqrt(3)));
		rotate(150);

		push();
			kochCurve(sidelength, 1, basedepth);

			push();
				translate(0, sidelength);
				rotate(120);

				kochCurve(sidelength, 1, basedepth);

				push();
					translate(0, sidelength);
					rotate(120);

					kochCurve(sidelength, 1, basedepth);

				pop();
			pop();
		pop();
	pop();
}

2