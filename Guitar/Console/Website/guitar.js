// Model

function Stroke (keyName) {
  this.button = keyToButton(keyName);
  var d = new Date();
  this.time = d.getTime();
}

/* Backtracking of keys will be added later. Maybe.
// Sorted list of all user key strokes
var allKeyStrokes = [];
// Keep the newest keystrokes in a different array. We will append it to "allKeyStrokes" when updating the view
var nextFreeIndex = 0;
var newKeyStrokes = [];
function addStroke (stroke) {
  newKeyStrokes[nextFreeIndex] = stroke;
  nextFreeIndex++;
}
*/
// Controller

document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  const buttonName = keyToButton(keyName);
  document.getElementById(buttonName).style.visibility = 'visible';
//  Add when History is added
//  var currentStroke = new Stroke(keyName);
//  addStroke(currentStroke);
}, false);

document.addEventListener('keyup', (event) => {
  const keyName = event.key;
  const buttonName = keyToButton(keyName);
  document.getElementById(buttonName).style.visibility = 'hidden';
}, false);

// Key to button mapping
function keyToButton (keyName) {
  var button = null;
  switch (keyName) {
    case 'q': button = "redButton"; break;
    case 'w': button = "yellowButton"; break;
    case 'e': button = "greenButton"; break;
    case 'r': button = "blueButton"; break;
    default : break;
  }
  return button;
}

// View


/*
// Update every 500ms=0.5s
var updateTime = 500;
setInterval(newKeyStrokes.forEach(showButtons), updateTime);

function showButtons (item, index) {
  var d = new Date();
  var now = d.getTime();
  var i = 0;
  // Set to a default keystroke
  var heldButton = 'undef';
  var lastKeyStroke;
  // Show all recently added strokes
  do {
    i++;
    document.getElementById(heldButton).style.visibility = 'visible';
    lastKeyStroke = keyStrokes[keyStrokes.length - i];
    heldButton = lastKeyStroke.button;
  }
  while (lastKeyStroke.time + updateTime > now);
}
*/
