var rainbow = false;

function setup(){
	// create a new canvas
	var canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0);

	// choose a random starting color
	stroke(random(0, 255), random(0, 255), random(0, 255));
	strokeCap(ROUND);
	strokeWeight(2);
}

// when spacebar typed, change tree color
function keyTyped() {
	if (key == ' ') {
		stroke(random(0, 255), random(0, 255), random(0, 255));
	}
}

// toggle rainbow mode on escape key pressed
function keyPressed() {
	if (keyCode == ESCAPE) {
		rainbow = !rainbow;
	}
}