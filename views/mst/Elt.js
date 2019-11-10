
// element class for union-find
class Elt {
  constructor(v, parent) {
    this.value = v;
    this.parent = parent;
  }
}

function hash(v) {
  return v.x + "," + v.y;
}

function makeEltsFromGraph(g) {
  var elts = {};
  for (var i = 0; i < g.vertices.length; i++) {
    elts[hash(g.vertices[i])] = new Elt(g.vertices[i], null);
  }
  return elts;
}

function find(e) {
  if (e.parent == null) {
    return e;
  } else {
    return find(e.parent);
  }
}

function canUnion(e1, e2) {
  p1 = find(e1);
  p2 = find(e2);

  if (p1 == p2) {
    return false;
  } else {
    p1.parent = p2;
    return true;
  }
}