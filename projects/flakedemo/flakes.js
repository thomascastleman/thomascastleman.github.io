var minim = -5;
var maxim = 5;
var step = 0.1;

var conv, div;

function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    background(255);

    angleMode(DEGREES);

    stroke(0);
    strokeWeight(1);

    conv = color(0, 255, 0);
    div = color(255, 0, 0);
}

function draw() {
    background(255);
    var scaleX = map(mouseX, 0, width, minim, maxim);
    var scaleY = map(mouseY, 0, height, minim, maxim);

    text("l: " + scaleX, 50, 50);
    text("r: " + scaleY, 50, 70);
    text("converge: " + converge(scaleX, scaleY), 50, 100);

    // displayGrid();

    lrFlake(scaleX, scaleY, width / 2, height / 2, 500, 4);


    // translate(width/2,height/2);
    // rotate(-90);
    // lrCurve(scaleX, scaleY, 400, 4);
}

function displayGrid() {
    strokeWeight(2);
    var y_axis = map(0, minim, maxim, 0, width);
    line(y_axis, 0, y_axis, height);
    var x_axis = map(0, minim, maxim, 0, height);
    line(0, x_axis, width, x_axis);
    strokeWeight(1);
    for (var x = minim; x < maxim; x += step) {
        var scaledX = map(x, minim, maxim, 0, width);
        for (var y = minim; y < maxim; y += step) {
            var scaledY = map(y, minim, maxim, 0, height);

            noStroke();
            fill(converge(x,y) ? conv : div);
            ellipse(scaledX, scaledY, 5, 5);
            stroke(0);
            // text(x + ',' + y, scaledX, scaledY);
        }
    }
}

function converge(l, r) {
    return l + r + (l*r) > 0.5;
}

// draw a single lr curve of a given length, with a given depth
function lrCurve(l, r, length, depth) {
    if (depth > 0) {

        let projection = length / (l + r + 1);
        let left = l * projection;
        let right = r * projection;

        lrCurve(l, r, left, depth - 1);

        push();
            translate(0, left);
            rotate(-60);

            lrCurve(l, r, projection, depth - 1);

            push();
                translate(0, projection);
                rotate(120);

                lrCurve(l, r, projection, depth - 1);

                push();
                    translate(0, projection);
                    rotate(-60);

                    lrCurve(l, r, right, depth - 1);

                pop();
            pop();
        pop();

    } else {
        line(0, 0, 0, length);
    }
}

// draw an lr snowflake at given x,y, with given sidelength and depth
function lrFlake(l, r, centerX, centerY, sidelength, depth) {
    push();
        // good ole trigonometry (center snowflake)
        translate(centerX, centerY + (sidelength / Math.sqrt(3)));
        rotate(150);

        push();
            lrCurve(l, r, sidelength, depth);

            push();
                translate(0, sidelength);
                rotate(120);

                lrCurve(l, r, sidelength, depth);

                push();
                    translate(0, sidelength);
                    rotate(120);

                    lrCurve(l, r, sidelength, depth);

                pop();
            pop();
        pop();
    pop();
}