var rainbow = false;

function setup(){
	var canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0);
	stroke(random(0, 255), random(0, 255), random(0, 255));
	strokeCap(ROUND);
	strokeWeight(2);
}

function keyTyped() {
	if (key == ' ') {
		stroke(random(0, 255), random(0, 255), random(0, 255));
	}
}
function keyPressed() {
	if (keyCode == ESCAPE && rainbow == false) {
		rainbow = true;
	} else {
		rainbow = false;
	}
}