// //////////
// Controller, follows the order of the associated HTML elements
// //////////

var GuitarController = function (model){
    this.model = model;
}

GuitarController.prototype = {

    // Deletes the current history
    deleteHistory: function () {
        strokeHistory = new Track('History', []);
        model.resetTime();
    },

};

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
function keyToButton(keyName) {
    var button = null;
    switch (keyName) {
        case 'q':
            button = 'redButton';
            break;
        case 'w':
            button = 'yellowButton';
            break;
        case 'e':
            button = 'greenButton';
            break;
        case 'r':
            button = 'blueButton';
            break;
        default :
            break;
    }
    return button;
}

// Correspond to the buttons in the horizontal menu

// Currently doesn't do anything. Should reset the time and, if available, play the music of a track
function playTrack(track) {
    console.log('now playing: ' + track.name);
}

// Adds the current history to the list of all tracks
function saveHistory() {
    var newTrackName = document.getElementById('newTrackNameInput').value;
    var newTrack = new Track(newTrackName, strokeHistory.strokeList);
    addTrack(newTrack);
    deleteHistory();
}

// The handlers for the mp3 file operations, using the howler.js library
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