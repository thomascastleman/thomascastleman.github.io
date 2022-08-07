// NODE CLASS

function Node(x, y) {
	// position in grid
	this.position = createVector(x, y);

	// used to help visualize node
	this.state = 'none';

	// costs to determine most promising node
	this.fCost; // f(n) = g(n) + h(n)
	this.gCost; // distance to starting node
	this.hCost;	// (Manhattan) distance to end node

	this.parent; // neighboring node with best path to starting node

	// given any parent, determine gCost based on that parent (not limited to current parent)
	this.calcGCost = function(parent) {	
		if (this.position.x != parent.position.x && this.position.y != parent.position.y) {		// if diagonal to parent
			return parent.gCost + 14;
		} else {
			return parent.gCost + 10;
		}
	}

	// calculate the fCost of a node
	this.calcFCost = function() {
		this.gCost = this.calcGCost(this.parent);	// calculate gCost using parent
		this.fCost = this.gCost + this.hCost;
	}

	// display the node on the grid
	this.display = function() {
		fill(colors[this.state]);		// color node appropriately
		strokeWeight(1);
		stroke(0, 50);
		rect(this.position.x * w, this.position.y * w, w, w);
	}
}