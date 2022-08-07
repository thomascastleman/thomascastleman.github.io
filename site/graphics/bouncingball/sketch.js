var b = [];
var ballcount = 50;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	background(51);
	frameRate(700);

	for (var i = 0; i < ballcount; i++) {
		b.push(new Ball(5));
	}
}

function draw() {
	for (var i = 0; i < ballcount; i++) {
		b[i].display();
		b[i].move();
	}
}