// //////
// Model
// //////

// Time normalisation
var startingTime = timeInit();

// Move the song three seconds to the future, to give the first notes time to
var visualDelay = 3000;

function timeInit() {
	var d = new Date();
	return d.getTime();
}

function resetTime() {
	startingTime = timeInit();
}

function timeSinceStart() {
	var d = new Date();
	var time = d.getTime();
	return time - startingTime;
}

// Show the time in the HTML menu
function updateClock() {
	document.getElementById("time").innerHTML = timeSinceStart();
}
setInterval(updateClock, 50);

// Our first datatype: a button-time pair
class Stroke {
	constructor(buttonName) {
		this.button = buttonName;
		this.time = timeSinceStart();
		//scoreCheck(buttonName, timeSinceStart());
	}
}

// Our second datatype: a name-strokearray pair
class Track {
	constructor(name, strokeList) {
		this.name = name;
		this.strokeList = strokeList;
		this.nextFreeIndex = strokeList.length;
	}
}

// Adds a stroke to a track
function addStroke(track, stroke) {
	if (track === "undefined" || stroke === "undefined") {
		console.log("track/stroke undefined");
	} else {
		track.strokeList[track.nextFreeIndex] = stroke;
		track.nextFreeIndex++;
	}
}

// Contains all strokes of the song. Currently does not read the song.
const songStrokes = new Track("Happy End of the World", []);
// A test song. Note that the timestamps of the Strokes are very low, since the Strokes are create at the moment the page is loaded, right after resetTime. We prefered this over building a second constructor, since JavaScript won't allow us to make a nice second constructor
const testTrack = new Track("Test", [new Stroke("redButton"), new Stroke("blueButton"),]);

// Contains all available/playable tracks
var tracks = [songStrokes, testTrack,];
var nextFreeIndexTracks = 2;
// A safe way to add tracks
function addTrack(track) {
	tracks[nextFreeIndexTracks] = track;
	nextFreeIndexTracks++;
	// Refresh the dropdownMenu
	generateDropdownMenu();
}

// List of all user key strokes sorted on timeSinceStart
var strokeRecording = new Track("Recording", []);

// The track that is being played right now
var currentTrack;

// The player score: how many strokes did he hit correctly?
var score = 0;

// Show the time in the HTML menu
function updateScore() {
	document.getElementById("score").innerHTML = score;
}
setInterval(updateScore, 50);

function scoreCheck(button, time) {
	var checked = false;
	for (let stroke of currentTrack.strokeList) {
		if (checked) {
			break;
		}
		if (stroke.button == button && stroke.time - time < 500) {
			score = score + 1;
		}
	}
}

// //////
// Controller, follows the order of the associated HTML elements
// //////

// Chooses between socket IO input and keyboard input
function inputChooser(){
    var socket = io();
    // The user wants to use the IO input
	if(document.getElementById("inputChoice").checked){
		console.log("choose socket io");
		socketIOinput(socket);
        //$('*').off('keyup keydown');
    } else {
		console.log("choose keyboard");
		socket.disable("server-message");
	}
}

// Upon pressing the 'q', 'w', 'e' or 'r' the button will be highlighted and the Stroke will be added to the Recording track
// Corresponds to buttons shown on the bottom of the canvas
document.addEventListener("keydown", event => {
	const keyName = event.key;
	const buttonName = keyToButton(keyName);
	const stroke = new Stroke(buttonName);
	if (buttonName != null) {
		document.getElementById(buttonName).style.visibility = "visible";
		addStroke(strokeRecording, stroke);
	}
}, false);

// Upon releasing the 'q', 'w', 'e' or 'r' the highlighted button will become invisible again
document.addEventListener("keyup", event => {
	const keyName = event.key;
	const buttonName = keyToButton(keyName);
	if (buttonName != null) {
		document.getElementById(buttonName).style.visibility = "hidden";
	}
}, false);

// Key to button mapping
// We would love to wrap this in a Maybe and make the buttons an enumerate. Maybe JavaScript doesn't really fit our coding style
function keyToButton(keyName) {
	var button = null;
	switch (keyName) {
		case "q":
			button = "redButton";
			break;
		case "w":
			button = "yellowButton";
			break;
		case "e":
			button = "greenButton";
			break;
		case "r":
			button = "blueButton";
			break;
		default:
			break;
	}
	if(button = null){
		console.log("Tried to make button, but incorrect key was hit");
	}
	return button;
}

// Converts the Rpi socket input to button presses
function socketIOinput(socket) {
    socket.on('server-message', function(message) {
		console.log(message);
        var notes = message;
        recordIOStroke(notes[0], "redButton");
        recordIOStroke(notes[1], "yellowButton");
        recordIOStroke(notes[2], "greenButton");
        recordIOStroke(notes[3], "blueButton");
    });
}

// Given a note and a corresponding button name, records the note as a stroke
function recordIOStroke(note, buttonName){
	if(note == "1"){				// The note is hit
        document.getElementById(buttonName).style.visibility = "visible";
        const stroke = new Stroke(buttonName);
        addStroke(strokeRecording, stroke);
    } else if(note == "0"){			// The note isn't hit
        document.getElementById(buttonName).style.visibility = 'hidden';
    } else {
		console.log("unexpected IO input: " + note);
	}
}

// Correspond to the buttons in the horizontal menu

// Deletes the current recording
function deleteRecording() {
	strokeRecording = new Track("Recording", []);
	resetTime();
}

// Adds the current Recording to the list of all tracks
function saveRecording() {
	var newTrackName = document.getElementById("newTrackNameInput").value;
	var newTrack = new Track(newTrackName, strokeRecording.strokeList);
	console.log("New track added: " + printTrack(newTrack));
	addTrack(newTrack);
	deleteRecording();
}

// The handlers for the mp3 file operations, written in jquery using the howler.js library
$(function() {
	var howlerExample = new Howl({src: ["../ParserAndResult/Alone.mp3"], volume: 0.5});
	$("#howler-play").on("click", function() {
		howlerExample.play();
	});
	$("#howler-pause").on("click", function() {
		howlerExample.pause();
	});
	$("#howler-stop").on("click", function() {
		howlerExample.stop();
	});
	$("#howler-volup").on("click", function() {
		var vol = howlerExample.volume();
		vol += 0.1;
		if (vol > 1) {
			vol = 1;
		}
		howlerExample.volume(vol);
	});
	$("#howler-voldown").on("click", function() {
		var vol = howlerExample.volume();
		vol -= 0.1;
		if (vol < 0) {
			vol = 0;
		}
		howlerExample.volume(vol);
	});
});

// //////
// View
// //////

// First: print functions for our datatypes. We use these for debugging/logging
// Note: Overriding toString within the classes didn't work :(

// Readable string format for a Stroke
function printStroke(stroke) {
	var abbrev = "Undef/null toString Stroke";
	if (stroke === "undefined" || stroke === "null") {
		return abbrev;
	} else {
		switch (stroke.button) {
			case "redButton":
				abbrev = "r";
				break;
			case "yellowButton":
				abbrev = "y";
				break;
			case "greenButton":
				abbrev = "g";
				break;
			case "blueButton":
				abbrev = "b";
				break;
			default:
				break;
		}
		return abbrev + "," + stroke.time;
	}
}

// Readable string format for Stroke list, prints at most 5 elements
function printStrokeList(strokeList) {
	var outputString = "";
	if (strokeList === "undefined") {
		console.log("strokeList undefined");
	} else {
		for (var i = 0; i < Math.min(strokeList.length, 5); i++) {
			outputString += "(";
			outputString += printStroke(strokeList[i]);
			outputString += ") ";
		}
	}
	return outputString;
}

// Readable string format for a Track
function printTrack(track) {
	var outputString = "";
	outputString += track.name;
	outputString += ": ";
	outputString += printStrokeList(track.strokeList);
	return outputString;
}

// JavaScript concerning the view of the canvas/playfield

// Shows orderd list of strokes that will come in the next 3 seconds
function showFutureStrokes(track) {
	console.log("showFutureStrokes: " + printTrack(track) + timeSinceStart());
	if (track) {
		for (var i = 0; i < track.strokeList.length; i++) {
			var stroke = track.strokeList[i];
			var delayTime = stroke.time;
			console.log(delayTime);
			setTimeout(function() {
				showStroke(stroke);
			}, delayTime);
		}
		console.log("Finished rendering " + track.name);
	}
}

// Shows one stroke
function showStroke(stroke) {
	var strokeDiv = document.createElement("div");
	var colour = buttonToColour(stroke.button);
	strokeDiv.classList.add(colour);
	strokeDiv.classList.add("strokeToCome");
	var strip = document.getElementById(colour + "Strip");
	strip.appendChild(strokeDiv);
	$(strokeDiv).animate({
		top: "+=580px"
	}, visualDelay);
	setTimeout(function() {
		strip.removeChild(strokeDiv);
	}, visualDelay);
}

// Returns the CSS class of the strip that the given stroke belongs to
function buttonToColour(button) {
	var strip = "Error! Undef/null";
	if (button !== "undefined" || button !== "null") {
		switch (button) {
			case "redButton":
				strip = "red";
				break;
			case "yellowButton":
				strip = "yellow";
				break;
			case "greenButton":
				strip = "green";
				break;
			case "blueButton":
				strip = "blue";
				break;
			default:
				break;
		}
	}
	return strip;
}

// JavaScript concerning the view of the horizontal menu

// Generates the dropdown menu containing all playable tracks
function generateDropdownMenu() {
	var dropdownContent = document.getElementById("dropdown-content");
	var oldDropdownList = document.getElementById("dropdownList");
	if (dropdownContent) {
		var newDropdownList = document.createElement("ul");
		newDropdownList.id = "dropdownList";
		for (var i = 0; i < tracks.length; i++) {
			var track = tracks[i];
			var trackEntry = document.createElement("li");
			trackEntry.id = "trackEntry" + i;
			trackEntry.classList.add("dropdown-content");
			trackEntry.addEventListener("click", function() {
				setTimeout(function() {
					currentTrack = track;
					resetTime();
					showFutureStrokes(track);
				}, visualDelay);
			});
			var text = document.createTextNode(track.name);
			trackEntry.appendChild(text);
			newDropdownList.appendChild(trackEntry);
		}
		dropdownContent.replaceChild(newDropdownList, oldDropdownList);
	}
}
