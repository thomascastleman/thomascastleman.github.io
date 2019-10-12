var rainbow = false;
var treeSize = window.innerHeight / 4; // starting tree length of 1/4 screen height keeps tree in window. you're welcome
var branchRatio = 0.73;		// ratio of child branch to parent branch
var minBranchLen = 10;		// smallest branch length, in pixels
var angle = 20;				// angle of branch bend

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

function draw() {
	// redraw black background
	background(38);
	angleMode(DEGREES);

	// scale angle based on distance from mouse X to tree trunk
	angle = map(abs((width / 2) - mouseX), 0, width / 2, 1, 180);
	
	// move to horizontal center, bottom of window and draw tree
	push();
		translate(width / 2, height);
		drawTree(treeSize);
	pop();
}

/*  draws a tree facing straight up from the current orientation
    with branch length l */
function drawTree(l) {
	// base case: if we've reached the min len, stop
	if (l > minBranchLen) {
		// if rainbow mode activated, set random line color
		if (rainbow == true) {
			stroke(random(0, 255), random(0, 255), random(0, 255));
		}

		// draw a branch facing straight up, of length l
		line(0, 0, 0, -l);

		// keep track of our current orientation since I'm about to do a bunch of transformations
		push();
			// move to the end of the branch we just drew
			translate(0, -l);

			// rotate to the left
			rotate(-angle);

			// draw a baby tree on the left side
			drawTree(l * branchRatio);

			// rotate back to center (angle) and then further to the right (angle again), so 2 * angle
			rotate(2 * angle);

			// draw another baby tree on the right side
			drawTree(l * branchRatio);
		pop();
	}
}

// when space pressed, randomize color
function keyTyped() {
	if (key == ' ') {
		stroke(random(0, 255), random(0, 255), random(0, 255));
	}
}

// escape key activates rainbow mode
function keyPressed() {
	if (keyCode == ESCAPE) {
		rainbow = !rainbow;
	}
}