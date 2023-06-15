const TEXT_PADDING = 20;
const SPACEBAR_KEYCODE = 32;
let capture;
let currentWord;
let wordCounter = 0;

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);

  capture = createCapture(VIDEO);
  capture.hide();
  background(0);

  chooseNewWord();
}

// Query an API to get a random English word.
function chooseNewWord() {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const wordList = JSON.parse(xhttp.responseText);
      currentWord = wordList[0];
      wordCounter++;
    }
  };
  xhttp.open("GET", "https://random-word-api.herokuapp.com/word", true);
  xhttp.send();
}

// Determines the size that the webcam capture should be displayed at so that
// it will fit within the browser window (while preserving aspect ratio).
function fittedDimensions() {
  const heightFitByWidth = capture.height * (width / capture.width);
  const widthFitByHeight = capture.width * (height / capture.height);

  if (heightFitByWidth <= height) {
    return { width, height: heightFitByWidth };
  } else {
    return { width: widthFitByHeight, height };
  }
}

// Invoke the setup function whenever the window is resized, so that the camera
// view is always fitted to the current window.
window.onresize = (_event) => {
  setup();
};

// On spacebar, choose the next word
function keyPressed() {
  if (keyCode == SPACEBAR_KEYCODE) {
    chooseNewWord();
  }
}

function draw() {
  background(0);
  const fittedCapture = fittedDimensions();

  // Offset the captured image to center it
  const xOffset = (width - fittedCapture.width) / 2;
  const yOffset = (height - fittedCapture.height) / 2;

  image(capture, xOffset, yOffset, fittedCapture.width, fittedCapture.height);

  if (currentWord != undefined) {
    textAlign(LEFT, TOP);
    textSize(64);
    fill(0, 0, 0);
    strokeWeight(5);
    stroke(255, 255, 255);
    text(
      wordCounter + ": " + currentWord,
      xOffset + TEXT_PADDING,
      yOffset + TEXT_PADDING
    );
  }
}
