var rainbow = false;
var treeSize; // starting tree length of 1/4 screen height keeps tree in window. you're welcome
var distanceFromTree;
var minimum = 15;

function setup(){
	var canvas = createCanvas(windowWidth, windowHeight - $('nav').height());
	canvas.position(0, $('nav').height());
	canvas.style('z-index', '-1');

	treeSize = (height - 10) / 4;

	stroke(random(0, 255), random(0, 255), random(0, 255));
	strokeCap(ROUND);
	strokeWeight(2);
        
        mouseX = (width / 2) - 100;

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

function draw() {
	background(0);
	angleMode(DEGREES);

	distanceFromTree = abs((width / 2) - mouseX);
	
	push();
	translate(width / 2, height);
	rec_tree(treeSize, minimum, map(distanceFromTree, 0, width/2, 0, 180), treeSize);
	pop();
	
}

function drawLine(xPos, yPos, length) { // draws vertical line
	line(xPos, yPos, xPos, yPos - length);
}

function rec_tree(length, minimum, angle, original) {
	angleMode(DEGREES);

	transform_matrix(length, minimum, angle, original);
	rotate(angle * -2);
	if (length != original) {
		transform_matrix(length, minimum, angle, original);
	}
}

function transform_matrix(length, minimum, angle) { // draws a branch, transforms the current matrix to the end of it and rotates, then calls rec tree
	if (rainbow == true) {
		stroke(random(0, 255), random(0, 255), random(0, 255));
	}
	drawLine(0, 0, length);

	if (length > minimum) {
		push();
		translate(0, -length);
		rotate(angle);
		rec_tree(length * 0.75, minimum, angle);
		pop();
	}
}  