var b = [];
var ballcount = 40;
var xPosArray = [];
var yPosArray = [];
var lineColor = false;

function setup() {
	var canvas = createCanvas(window.innerWidth, window.innerHeight);
	canvas.position(0, 0);
	
	frameRate(60);
	for (var i = 0; i < ballcount; i++) { // initialize ball objects
		b.push(new Ball(random(75, 300)));
	}
}

function draw() {
	background(0);
	
	for (var i = 0; i < ballcount; i++) {
		b[i].update();
		b[i].display();
		xPosArray[i] = b[i].xPos; // record x and y positions for every ball object
		yPosArray[i] = b[i].yPos;
	}
	for (var i = 0; i < ballcount; i++) {
		for (var k = 0; k < ballcount; k++) { // check every other ball's position against that of b[i]
			if (dist(b[i].xPos, b[i].yPos, xPosArray[k], yPosArray[k]) < b[i].size) { // if it is closer than the diameter of b[i], connect them
				//stroke(map(dist(b[i].xPos, b[i].yPos, xPosArray[k], yPosArray[k])), 0, b[i].size, 255, 0);
				b[i].line(xPosArray[k], yPosArray[k]);
			}
		}
	}
}

function keyTyped() { // toggle line colors
	if (key == " ") {
		if (lineColor == false) {
			lineColor = true;
		} else {
			lineColor = false;
		}
	}
}
