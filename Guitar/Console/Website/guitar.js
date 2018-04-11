// //////////
// Model
// //////////

// Time normalisation
var startingTime = timeInit();

function timeInit () {
  var d = new Date();
  return d.getTime();
}

function resetTime () {
  startingTime = timeInit();
}

function timeSinceStart () {
  var d = new Date();
  var time = d.getTime();
  return (time - startingTime);
}

// Our first datatype: a button-time pair
function Stroke (buttonName) {
  this.button = buttonName;
  this.time = timeSinceStart();
}

// Our second datatype: a name-strokearray pair
function Track (name, strokeList) {
  this.name = name;
  this.strokeList = strokeList;
  this.nextFreeIndex = strokeList.length;
  console.log('new Track: ' + this.name + this.nextFreeIndex);
}

// Adds a stroke to a track
function addStroke (track, stroke) {
  if (track === 'undefined' || stroke === 'undefined') {
    console.log('track/stroke undefined');
  } else {
    track.strokeList[track.nextFreeIndex] = stroke;
    track.nextFreeIndex++;
  }
}

// List of all user key strokes sorted on timeSinceStart
var strokeHistory = Track('History', []);

// Contains all strokes of the song
const songStrokes = Track('Happy End of the World', []);
const testStrokes = Track('Test', [Stroke('redButton'), Stroke('blueButton')]);

function testPrint () {
  console.log(testStrokes);
//  console.log(printTrack(testStrokes));
}

var tracks = [songStrokes, testStrokes];
var nextFreeIndexTracks = 2;
function addTrack (track) {
  tracks[nextFreeIndexTracks] = track;
  nextFreeIndexTracks++;
}

// Demonstrates a botergeile layout
function dropdownMenu () {
  var dropdownMenu = document.getElementById('dropdownMenuTest');
  var flatHtml = '';
  for (var i = 0; i < 10; i++) {
    flatHtml += '<a href="#">' + i + '</a>';
  }
  dropdownMenu.innerHTML = flatHtml;
}

// actual function, still debugging this though
function generateDropdownMenu () {
  var dropdownMenu = document.getElementById('dropdownMenu');
  if (dropdownMenu) {
    console.log('all tracks: ' + tracks);
    console.log('tracks length: ' + tracks.length);
    // console.log('track: ' + printTrack(track));
    var flatHtml = '';
    for (var i = 0; i < tracks.length; i++) {
      flatHtml += '<a href="#">' + i + '</a>';
      console.log('track ' + i + ': ' + tracks[i]);
    }
    dropdownMenu.innerHTML = flatHtml;
  }
}

// //////////
// Controller
// //////////
// TODO: de-lambdafunction them
document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  const buttonName = keyToButton(keyName);
  const stroke = Stroke(buttonName);
  if (buttonName != null) {
    document.getElementById(buttonName).style.visibility = 'visible';
    console.log('strokeHistory' + strokeHistory);
    addStroke(strokeHistory, stroke);
  }
}, false);

document.addEventListener('keyup', (event) => {
  const keyName = event.key;
  const buttonName = keyToButton(keyName);
  if (buttonName != null) {
    document.getElementById(buttonName).style.visibility = 'hidden';
  }
}, false);

// Key to button mapping
// I want to make a Maybe Enumerate of this
function keyToButton (keyName) {
  var button = null;
  switch (keyName) {
    case 'q': button = 'redButton'; break;
    case 'w': button = 'yellowButton'; break;
    case 'e': button = 'greenButton'; break;
    case 'r': button = 'blueButton'; break;
    default : break;
  }
  return button;
}

// //////////
// View
// //////////

// First: print functions for our datatypes
// Note: Overriding toString didn't work :(

// Readable string format for a Stroke
function printStroke (stroke) {
  var abbrev = 'Undef toString Stroke';
  switch (stroke.button) {
    case 'redButton': abbrev = 'r'; break;
    case 'yellowButton': abbrev = 'y'; break;
    case 'greenButton': abbrev = 'g'; break;
    case 'blueButton': abbrev = 'b'; break;
    default : break;
  }
  return abbrev + ', ' + stroke.time;
}

// Readable string format for Stroke list
function printStrokeList (strokeList) {
  var outputString = '';
  for (var i = 0; i < strokeList.length; i++) {
    outputString += printStroke(strokeList[i]);
    outputString += '/n';
  }
  return outputString;
}

// Readable string format for a Track
function printTrack (track) {
  var outputString = '';
  outputString += track.name;
  outputString += ': ';
  outputString += printStrokeList(track.strokeList);
  return outputString;
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
