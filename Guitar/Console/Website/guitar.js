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
const testTrack = new Track('Test', [new Stroke('redButton'), new Stroke('blueButton')]);

var tracks = [songStrokes, testTrack];
var nextFreeIndexTracks = 2;
function addTrack (track) {
  tracks[nextFreeIndexTracks] = track;
  nextFreeIndexTracks++;
  // Refresh the dropdownMenu
  generateDropdownMenu();
}

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

/*
// Janneau code
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
/**/

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

// heighten as much as hardware allows
var fps = 10;
var updateTime = (1/fps) * 1000;

// Shows strokes that will come in the next 3 seconds
function showFutureStrokes (track) {
  if (track) {
    for (var i = 0; i < track.strokeList.length; i++) {
      showStroke(track.strokeList[i]);
    }
  }
}

function showStroke (stroke) {
  var containerDiv = document.createElement('div');
  containerDiv.style['padding-top'] = '70%';

  var strokeDiv = document.createElement('div');
  var colour = buttonToColour(stroke.button);
  strokeDiv.classList.add(colour);
  strokeDiv.classList.add('strokeToCome');
  var strip = document.getElementById(colour + 'Strip');
  containerDiv.appendChild(strokeDiv);
  strip.appendChild(containerDiv);
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
