
var interval;
var building = false;
var delay = 200;

function buildRandomMST() {
  building = true;
  g = new Graph();

  interval = setInterval(() => {
    g.addVertex(random(0, 0.5 * width) + (0.25 * width), random(0, 0.5 * height) + (0.25 * height));
    mst = new MST(g);
  }, delay);
}

function stopMST() {
  clearInterval(interval);
  building = false;
}