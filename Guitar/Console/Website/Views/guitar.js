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
class Stroke {
  constructor (buttonName) {
    this.button = buttonName;
    this.time = timeSinceStart();
  }
}

// Our second datatype: a name-strokearray pair
class Track {
  constructor (name, strokeList) {
    this.name = name;
    this.strokeList = strokeList;
    this.nextFreeIndex = strokeList.length;
  }
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

// Contains all strokes of the song
const songStrokes = new Track('Happy End of the World', []);
// A test song
const testSong = new Track('Test', [new Stroke('redButton'), new Stroke('blueButton')]);

var tracks = [songStrokes, testSong];
var nextFreeIndexTracks = 2;
function addTrack (track) {
  tracks[nextFreeIndexTracks] = track;
  nextFreeIndexTracks++;
  // Refresh the dropdownMenu
  generateDropdownMenu();
}

// TODO: make onClicks with function
function generateDropdownMenu () {
  var dropdownContent = document.getElementById('dropdown-content');
  if (dropdownContent) {
    var flatHtml = '<ul id="dropdownList">';
    for (var i = 0; i < tracks.length; i++) {
      flatHtml += '<li onClick="playTrack(' + tracks[i] + ')" class="dropdown-content">' + tracks[i].name + '</li>';
    }
    flatHtml += '</ul>';
    dropdownContent.innerHTML = flatHtml;
  }
}

function playTrack (track) {
  console.log('now playing: ' + track.name);
}

// List of all user key strokes sorted on timeSinceStart
var strokeHistory = new Track('History', []);

function deleteHistory () {
  strokeHistory = new Track('History', []);
  resetTime();
}

function saveHistory () {
  var newTrackName = document.getElementById('newTrackNameInput').value;
  var newTrack = new Track(newTrackName, strokeHistory.strokeList);
  console.log('in saveHistory: ' + printTrack(newTrack));
  addTrack(newTrack);
  deleteHistory();
}

// //////////
// Controller
// //////////
document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  const buttonName = keyToButton(keyName);
  const stroke = new Stroke(buttonName);
  if (buttonName != null) {
    document.getElementById(buttonName).style.visibility = 'visible';
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
  var abbrev = 'Undef/null toString Stroke';
  if (stroke === 'undefined' || stroke === 'null') {
    return abbrev;
  } else {
    switch (stroke.button) {
      case 'redButton': abbrev = 'r'; break;
      case 'yellowButton': abbrev = 'y'; break;
      case 'greenButton': abbrev = 'g'; break;
      case 'blueButton': abbrev = 'b'; break;
      default : break;
    }
    return abbrev + ',' + stroke.time;
  }
}

// Readable string format for Stroke list, prints at most 5 elements
function printStrokeList (strokeList) {
  var outputString = '';
  if (strokeList === 'undefined') {
    console.log('strokeList undefined');
  } else {
    for (var i = 0; i < Math.min(strokeList.length, 5); i++) {
      outputString += '(';
      outputString += printStroke(strokeList[i]);
      outputString += ') ';
    }
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
