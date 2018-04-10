/////////
// Model
/////////

// Time normalisation
var startingTime = timeInit();

function timeInit (){
  var d = new Date();
  return d.getTime();
}

function resetTime (){
  startingTime = timeInit();
}

function timeSinceStart (){
  var d = new Date();
  time = d.getTime();
  return (time - startingTime)
}

// Our first datatype: a button-time pair
function Stroke(buttonName) {
  this.button = buttonName;
  this.time = timeSinceStart();
}

// Overriding toString didn't work :(
function printStroke(stroke) {
  var abbrev = "Undef toString Stroke";
  switch (stroke.button) {
    case "redButton": abbrev = "r"; break;
    case "yellowButton": abbrev = "y"; break;
    case "greenButton": abbrev = "g"; break;
    case "blueButton": abbrev = "b"; break;
    default : break;
  }
  return abbrev + ", " + stroke.time;
}

// Sorted list of all user key strokes
var strokeHistory = [];
var nextFreeIndex = 0;
function addStroke (stroke) {
  strokeHistory[nextFreeIndex] = stroke;
  nextFreeIndex++;
}

// Contains all strokes of the song
const songStrokes = [];

/////////
// Controller
/////////

document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  const buttonName = keyToButton(keyName);
  if (buttonName != null){
    document.getElementById(buttonName).style.visibility = 'visible';
    addStroke(new Stroke(buttonName));
  }
//  Add when History is added
//  var currentStroke = new Stroke(keyName);
//  addStroke(currentStroke);
}, false);

document.addEventListener('keyup', (event) => {
  const keyName = event.key;
  const buttonName = keyToButton(keyName);
  if (buttonName != null){
    document.getElementById(buttonName).style.visibility = 'hidden';
  }
}, false);

// Key to button mapping
// I want to make a Maybe of this
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

/////////
// View
/////////

// Readable string dataformat for Stroke history
function printStrokeHistory () {
  var outputString = "";
  for (var i = 0; i < strokeHistory.length; i++) {
    outputString += strokeHistory[i].toString();
    outputString += "/n";
  }
  document.getElementById('modalContent').innerHTML = outputString;
}

/*
// heighten as much as hardware allows
var fps = 10;
var updateTime = (1/fps)*1000;
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
