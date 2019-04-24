
var net;
var params = [5, 20, 20, 20, 2];

var nodeSize;
var vertSpacing;

var colors = false;

$(document).ready( function() {
	$('#generate').click( function() {
		var str = $('#params').val();
		
		if (str != "") {
			params = [];
			var list = str.split(' ');

			// get parameters
			for (var i = 0; i < list.length; i++) {
				var val = parseInt(list[i], 10);

				if (val > 0) {
					params.push(val);
				}
			}

			setup();
		}
	});

	$('#color').click( function() {
		// toggle colors
		colors = colors ? false : true;
		setup();
	});
});

function setup() {
	var canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0);
	canvas.style('z-index', '-1');
	background(30);
	stroke(120);

	net = new Network(params);
	net.display();
}

// full network model
function Network(params) {
	this.layers = [];
	this.horizSpacing = width / params.length;

	// find maximum layer size in network
	var max = params[0]
	for (var i = 0; i < params.length; i++) {
		if (params[i] > max) {
			max = params[i];
		}
	}

	// vertical spacing is that of the largest layer in the network
	vertSpacing = height / max;

	// node size depends on largest layer in network as well
	nodeSize = height / (max + ((max - 1) * 2));
	nodeSize = max < 6 ? (max == 1 ? height / params.length : nodeSize / 2) : nodeSize;

	// initialize layers
	for (var i = 0; i < params.length; i++) {
		this.layers.push(new Layer((i * this.horizSpacing) + (this.horizSpacing / 2), params[i]));
	}

	this.display = function() {
		// for every layer
		for (var l = 0; l < this.layers.length - 1; l++) {
			// for every node in current layer
			for (var n = 0; n < this.layers[l].nodes.length; n++) {
				var thisNode = this.layers[l].nodes[n];
				// for every node in next layer
				for (var n2 = 0; n2 < this.layers[l + 1].nodes.length; n2++) {
					var nextNode = this.layers[l + 1].nodes[n2];
					if (colors) {
						stroke(random(255), random(255), random(255));
					}
					line(thisNode.position.x, thisNode.position.y, nextNode.position.x, nextNode.position.y);
				}
			}
		}


		for (var i = 0; i < this.layers.length; i++) {
			this.layers[i].display();
		}
	}
}

// layer of nodes, given x position and size of layer
function Layer(x, size) {
	this.nodes = [];

	// initialize nodes
	for (var i = 0; i < size; i++) {
		var position = (i * vertSpacing) + ((height - ((size - 1) * vertSpacing)) / 2)
		this.nodes.push(new Node(x, position));
	}
	// display nodes in layer
	this.display = function() {
		for (var i = 0; i < this.nodes.length; i++) {
			this.nodes[i].display();
		}
	}
}

// single node in a layer, given x and y position
function Node(x, y) {
	this.position = createVector(x, y);
	this.display = function() {
		fill(255);
		stroke(0);
		ellipse(this.position.x, this.position.y, nodeSize, nodeSize);
	}
}