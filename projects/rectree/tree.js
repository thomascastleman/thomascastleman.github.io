var treeSize = window.innerHeight / 4; // starting tree length of 1/4 screen height keeps tree in window. you're welcome
var distanceFromTree;

function draw() {
	background(0);
	angleMode(DEGREES);

	distanceFromTree = abs((width / 2) - mouseX);
	
	push();
	translate(width / 2, height);
	rec_tree(treeSize, 15, map(distanceFromTree, 0, width/2, 1, 45), treeSize);
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