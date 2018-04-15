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

// Contains all strokes of the song. Currently does not read the song.
const songStrokes = new Track('Happy End of the World', []);
// A test song. Note that the timestamps of the Strokes are very low, since the Strokes are create at the moment the page is loaded, right after resetTime. We prefered this over building a second constructor, since JavaScript won't allow us to make a nice second constructor
const testTrack = new Track('Test', [new Stroke('redButton'), new Stroke('blueButton')]);

// Contains all available/playable tracks
var tracks = [songStrokes, testTrack];
var nextFreeIndexTracks = 2;
// A safe way to add tracks
function addTrack (track) {
  tracks[nextFreeIndexTracks] = track;
  nextFreeIndexTracks++;
  // Refresh the dropdownMenu
  generateDropdownMenu();
}

// List of all user key strokes sorted on timeSinceStart
var strokeHistory = new Track('History', []);

// //////////
// Controller, follows the order of the associated HTML elements
// //////////

// Corresponds to buttons shown on the bottom of the canvas

// Upon pressing the 'q', 'w', 'e' or 'r' the button will be highlighted and the Stroke will be added to the history track
document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  const buttonName = keyToButton(keyName);
  const stroke = new Stroke(buttonName);
  if (buttonName != null) {
    document.getElementById(buttonName).style.visibility = 'visible';
    addStroke(strokeHistory, stroke);
  }
}, false);

// Upon releasing the 'q', 'w', 'e' or 'r' the highlighted button will become invisible again
document.addEventListener('keyup', (event) => {
  const keyName = event.key;
  const buttonName = keyToButton(keyName);
  if (buttonName != null) {
    document.getElementById(buttonName).style.visibility = 'hidden';
  }
}, false);

// Key to button mapping
// We would love to wrap this in a Maybe and make the buttons an enumerate. Maybe JavaScript doesn't really fit our coding style
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

// Correspond to the buttons in the horizontal menu

// Currently doesn't do anything. Should reset the time and, if available, play the music of a track
function playTrack (track) {
  console.log('now playing: ' + track.name);
}

// Deletes the current history
function deleteHistory () {
  strokeHistory = new Track('History', []);
  resetTime();
}

// Adds the current history to the list of all tracks
function saveHistory () {
  var newTrackName = document.getElementById('newTrackNameInput').value;
  var newTrack = new Track(newTrackName, strokeHistory.strokeList);
  addTrack(newTrack);
  deleteHistory();
}

// The handlers for the mp3 file operations, written in jquery using the howler.js library
$(function () {
  var howlerExample = new Howl({
    src: ['ParserAndResult/Alone.mp3'],
    volume: 0.5
  });
  $('#howler-play').on('click', function () {
    howlerExample.play();
  });
  $('#howler-pause').on('click', function () {
    howlerExample.pause();
  });
  $('#howler-stop').on('click', function () {
    howlerExample.stop();
  });
  $('#howler-volup').on('click', function () {
    var vol = howlerExample.volume();
    vol += 0.1;
    if (vol > 1) {
      vol = 1;
    }
    howlerExample.volume(vol);
  });
  $('#howler-voldown').on('click', function () {
    var vol = howlerExample.volume();
    vol -= 0.1;
    if (vol < 0) {
      vol = 0;
    }
    howlerExample.volume(vol);
  });
});

// //////////
// View
// //////////

// First: print functions for our datatypes. We use these for debugging/logging
// Note: Overriding toString within the classes didn't work :(

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

// JavaScript concerning the view of the canvas/playfield

// heighten as much as hardware allows. Is never used due to a shortage of time
var fps = 10;
var updateTime = (1/fps) * 1000;

// Shows strokes that will come in the next 3 seconds. Currently displays the number of strokes in the whole song
function showFutureStrokes (track) {
  if (track) {
    for (var i = 0; i < track.strokeList.length; i++) {
      showStroke(track.strokeList[i]);
    }
  }
}

// Shows one stroke that will come in the next 3 seconds. Currently displays one stroke indifferent of the time
function showStroke (stroke) {
  var containerDiv = document.createElement('div');
  // Only render if it's 3000ms ahead
  if (stroke.time - timeSinceStart() < 3000) {
    var topOffset = 3000 / (stroke.time - timeSinceStart) * 550;
    containerDiv.style['padding-top'] = topOffset;

    var strokeDiv = document.createElement('div');
    var colour = buttonToColour(stroke.button);
    strokeDiv.classList.add(colour);
    strokeDiv.classList.add('strokeToCome');
    var strip = document.getElementById(colour + 'Strip');
    containerDiv.appendChild(strokeDiv);
    strip.appendChild(containerDiv);
  }
}

// Returns the CSS class of the strip that the given stroke belongs to
function buttonToColour (button) {
  var strip = 'Error! Undef/null';
  if (button !== 'undefined' || button !== 'null') {
    switch (button) {
      case 'redButton': strip = 'red'; break;
      case 'yellowButton': strip = 'yellow'; break;
      case 'greenButton': strip = 'green'; break;
      case 'blueButton': strip = 'blue'; break;
      default : break;
    }
  }
  return strip;
}

// JavaScript concerning the view of the horizontal menu

// Generates the dropdown menu containing all playable tracks
function generateDropdownMenu () {
  var dropdownContent = document.getElementById('dropdown-content');
  var oldDropdownList = document.getElementById('dropdownList');
  if (dropdownContent) {
    var newDropdownList = document.createElement('ul');
    newDropdownList.id = 'dropdownList';
    for (var i = 0; i < tracks.length; i++) {
      var trackEntry = document.createElement('li');
      trackEntry.id = 'trackEntry' + i;
      trackEntry.classList.add('dropdown-content');
      var text = document.createTextNode(tracks[i].name);
      trackEntry.appendChild(text);
      newDropdownList.appendChild(trackEntry);
    }
    dropdownContent.replaceChild(newDropdownList, oldDropdownList);
  }
}
