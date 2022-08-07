
const VTX_SIZE = 10;
const STRK_WEIGHT = 2;
const BG = 20;
var mstColor;
var g;
var mst;

var showAllEdges = false;

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  background(BG);
  strokeWeight(STRK_WEIGHT);
  mstColor = color(random(255), random(255), random(255)); // color(51, 173, 255)

  g = new Graph();
  mst = new MST(g);
}

function draw() {
  background(BG);
  mst.display();
  g.displayVertices();
}

class Graph {
  constructor() {
    this.vertices = [];
  }

  // add new PVector vertex
  addVertex(x, y) {
    this.vertices.push(createVector(x, y));
  }

  // draw all graph vertices on canvas
  displayVertices() {
    for (var i = 0; i < this.vertices.length; i++) {
      var v = this.vertices[i];
      ellipse(v.x, v.y, VTX_SIZE, VTX_SIZE);
    }
  }
}

class MST {
  constructor(graph) {
    this.graph = graph;
    this.allEdges = this.constructEdges();
    this.mstEdges = this.computeMST();
  }

  // from vertex-centric graph representation, construct set of edges
  // using Euclidean distance as edge weight
  constructEdges() {
    var e = [];
    var vtcs = this.graph.vertices;
    for (var i = 0; i < vtcs.length; i++) {
      for (var j = 0; j < vtcs.length; j++) {
        if (i != j) {
          e.push(new Edge(vtcs[i], vtcs[j], dist(vtcs[i].x, vtcs[i].y, vtcs[j].x, vtcs[j].y)));
        }
      }
    }
    return e;
  }

  displayEdges(edges) {
    for (var i = 0; i < edges.length; i++) {
      var e = edges[i];
      line(e.v1.x, e.v1.y, e.v2.x, e.v2.y);
    }
  }

  display() {
    if (showAllEdges) {
      stroke(200, 20);
      strokeWeight(0.80);
      this.displayEdges(this.allEdges);
    }
    stroke(mstColor);
    strokeWeight(STRK_WEIGHT);
    this.displayEdges(this.mstEdges);
  }

  // compute the minimum spanning tree using Kruskal's algorithm
  computeMST() {
    var mst = [];
    var elts = makeEltsFromGraph(this.graph);

    var edges = this.allEdges.sort(function(a, b) {
      return a.weight - b.weight;
    });

    for (var i = 0; i < edges.length; i++) {
      var e = edges[i];
      var eltA = elts[hash(e.v1)];
      var eltB = elts[hash(e.v2)];

      if (canUnion(eltA, eltB)) {
        mst.push(e);
      }
    }

    return mst;
  }
}

// class to hold edge data
class Edge {
  constructor(v1, v2, weight) {
    this.v1 = v1;
    this.v2 = v2;
    this.weight = weight;
  }
}

function mouseClicked() {
  g.addVertex(mouseX, mouseY);
  mst = new MST(g);
}

function keyPressed() {
  console.log(keyCode);
  // spacebar
  if (keyCode == 32) {
    showAllEdges = !showAllEdges;
  }
  // 'b' key
  if (keyCode == 66) {
    if (building) {
      stopMST();
    } else {
      buildRandomMST();
    }
  }
  // 'x' key
  if (keyCode == 88) {
    g = new Graph();
    mst = new MST(g);
  }
}