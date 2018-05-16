// //////////
// Model
// //////////

var GuitarModel = function () {
    this.startingTime = timeInit();
};

GuitarModel.prototype = {
    // Time normalisation
    timeInit: function () {
        var d = new Date();
        return d.getTime();
    },

    resetTime: function () {
        startingTime = timeInit();
        console.log("time reset!");
    }
};



function timeSinceStart() {
    var d = new Date();
    var time = d.getTime();
    return (time - startingTime);
}

// Our first datatype: a button-time pair
class Stroke {
    constructor(buttonName) {
        this.button = buttonName;
        this.time = timeSinceStart();
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
function addTrack(track) {
    tracks[nextFreeIndexTracks] = track;
    nextFreeIndexTracks++;
    // Refresh the dropdownMenu
    generateDropdownMenu();
}

// List of all user key strokes sorted on timeSinceStart
var strokeHistory = new Track('History', []);
