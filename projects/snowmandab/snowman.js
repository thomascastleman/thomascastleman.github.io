// WRITTEN BY ANDERS KNOSPE


var cameraSpinning = true;

function setup() {
	var canvas = createCanvas(window.innerWidth, window.innerHeight, WEBGL);
	canvas.position(0, 0);
	strokeWeight(0);
}

var pause = false; // if the dab pauses
var inverseDabVelocity = 10.5;
var counter = 0;

function draw() {
	counter++;
	background(200, 100, 250);

	if (cameraSpinning == true) {
		camera(200.0*cos(frameCount/100.0), -150, 300.0*sin(frameCount/100.0) + 700);
	} else {
		camera(0, -150, 200);
	}

	scale(2);
	
	push();
	if (cameraSpinning == true) {
		rotateY(frameCount / 100.0);
	} else {
		rotateX(PI/8);
	}

	push();
	translate(0, -50, 0);
	body();
	head();
	pop();

	push();
	fill(105, 51, 0);
	armL();
	armL2(43.0);
	armR();
	pop();

	fill(100);
	box(700, 10, 700);

	pop();

	
}

function keyPressed() {
	if (key == ' ') {
		inverseDabVelocity -= 1.0;
		if (inverseDabVelocity <= 0.0) {
			inverseDabVelocity = 12.0;
		}
	}
}

function keyTyped() {
	if (key == 'a') {
		if (cameraSpinning == true) {
			cameraSpinning = false;
		} else {
			cameraSpinning = true;
		}
	}
}


function body() {
	fill(255);
  	sphere(42);
  	push();
  	fill(0);
  	translate(0,-14,40.5);
  	sphere(2);
  	translate(0,13,1.8);
  	sphere(2);
  	translate(0,13,-1);
  	sphere(2);
  	fill(255);
  	pop();
  	translate(0, -50, 0);
  	sphere(33);
  	push();
  	fill(0);
  	translate(0,-10,32.5);
  	sphere(2);
  	translate(0,9,1);
  	sphere(2);
  	translate(0,9,-1);
  	sphere(2);
  	fill(255);
  	pop();
  	translate(0, -35, 0);
  	fill(0);
}


function head() {
	push(); 
	translate(0,8,4);
	rotateX(-0.4*sin(counter/inverseDabVelocity)+2*PI/9);
	translate(0,-12,-4);
	fill(255);
	sphere(21); 
	pop();
	  
	push();
	translate(0,8,4);
	rotateX(-0.4*sin(counter/inverseDabVelocity)+2*PI/9);
	translate(-7,-25,10);
	fill(0);
	sphere(2.5);
	translate(14,0,0);
	sphere(2.5);
	translate(-7,0,0);
	fill(255);
	nose();
	fill(255);  
	pop();

}

function nose() {
  push();
  translate(0, 2, 9);
  fill(255,153,0);
  drawCylinder(16, 2.5, 0.9, 12);
  fill(0);
  pop();
}

function drawCylinder(sides, r1, r2, h) {
  var angle = 360 / sides;
  var halfHeight = h / 2;
  // top
  beginShape();
  for (var i = 0; i < sides; i++) {
    var x = cos( radians( i * angle ) ) * r1;
    var y = sin( radians( i * angle ) ) * r1;
    vertex( x, y, -halfHeight);
  }
  endShape(CLOSE);
  // bottom
  beginShape();
  for (var i = 0; i < sides; i++) {
    var x = cos( radians( i * angle ) ) * r2;
    var y = sin( radians( i * angle ) ) * r2;
    vertex( x, y, halfHeight);
  }
  endShape(CLOSE);
  // draw body
  beginShape(TRIANGLE_STRIP);
  for (var i = 0; i < sides + 1; i++) {
    var x1 = cos( radians( i * angle ) ) * r1;
    var y1 = sin( radians( i * angle ) ) * r1;
    var x2 = cos( radians( i * angle ) ) * r2;
    var y2 = sin( radians( i * angle ) ) * r2;
    vertex( x1, y1, -halfHeight);
    vertex( x2, y2, halfHeight);
  }
  endShape(CLOSE);
}

function armL() {
  push(); 
  
  translate(30, -115, 0);
  sphere(2.5);
  rotateY(sin(counter/inverseDabVelocity) - PI/3.0); //-pi/3
  rotateZ(-0.2*sin(counter/inverseDabVelocity));
  translate(23, 0, 0);


  box(43, 5, 5);
  pop();
}

function armL2(p_arm_length) {
  push(); 
  translate(29, -115, 0);
  var rotation_degree = sin(counter/inverseDabVelocity) - PI/3.0;
  var height_degree = 0.2*sin(counter/inverseDabVelocity);

  var t = p_arm_length*(cos(-rotation_degree));
  var c = p_arm_length*(sin(-rotation_degree));
  var m = p_arm_length*(sin(height_degree));
  translate(t, m, c); //30 + 
  push();
  translate(1.65,0,-1);
  sphere(3);
  pop();
  rotateY(1.5*sin(counter/inverseDabVelocity) - PI/2);
  rotateZ(0.2 * sin(counter/inverseDabVelocity)+PI/6);
  translate(18, 0, 0);
  box(40, 5, 5);
  pop();
}

function armR() {
	push(); 
	translate(-30, -115, 0); //-115
	sphere(2.5);
	rotateZ(PI/6);
	rotateY(0.25*sin(counter/inverseDabVelocity)); //-pi/3
	rotateZ(0.7*sin(counter/inverseDabVelocity) - PI/360);
	translate(-35, 0, 0);
	box(65, 5, 5);
	pop();
}