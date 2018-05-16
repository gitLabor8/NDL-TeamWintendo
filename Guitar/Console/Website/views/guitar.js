$(function () {
    var model = new GuitarModel();
});



// //////////
// View
// //////////

// First: print functions for our datatypes. We use these for debugging/logging
// Note: Overriding toString within the classes didn't work :(

// Readable string format for a Stroke
function printStroke(stroke) {
    var abbrev = 'Undef/null toString Stroke';
    if (stroke === 'undefined' || stroke === 'null') {
        return abbrev;
    } else {
        switch (stroke.button) {
            case 'redButton':
                abbrev = 'r';
                break;
            case 'yellowButton':
                abbrev = 'y';
                break;
            case 'greenButton':
                abbrev = 'g';
                break;
            case 'blueButton':
                abbrev = 'b';
                break;
            default :
                break;
        }
        return abbrev + ',' + stroke.time;
    }
}

// Readable string format for Stroke list, prints at most 5 elements
function printStrokeList(strokeList) {
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
function printTrack(track) {
    var outputString = '';
    outputString += track.name;
    outputString += ': ';
    outputString += printStrokeList(track.strokeList);
    return outputString;
}

// JavaScript concerning the view of the canvas/playfield

// heighten as much as hardware allows. Is never used due to a shortage of time
var fps = 10;
var updateTime = (1 / fps) * 1000;

// Shows strokes that will come in the next 3 seconds. Currently displays the number of strokes in the whole song
function showFutureStrokes(track) {
    if (track) {
        for (var i = 0; i < track.strokeList.length; i++) {
            showStroke(track.strokeList[i]);
        }
    }
}

// Shows one stroke that will come in the next 3 seconds. Currently displays one stroke indifferent of the time
function showStroke(stroke) {
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
function buttonToColour(button) {
    var strip = 'Error! Undef/null';
    if (button !== 'undefined' || button !== 'null') {
        switch (button) {
            case 'redButton':
                strip = 'red';
                break;
            case 'yellowButton':
                strip = 'yellow';
                break;
            case 'greenButton':
                strip = 'green';
                break;
            case 'blueButton':
                strip = 'blue';
                break;
            default :
                break;
        }
    }
    return strip;
}

// JavaScript concerning the view of the horizontal menu

// Generates the dropdown menu containing all playable tracks
function generateDropdownMenu() {
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
