document.addEventListener('keydown', (event) => {
  const keyName = event.key;
	button = pickButton(keyName);
  document.getElementById(button).style.visibility = 'visible';
}, false);

document.addEventListener('keyup', (event) => {
	const keyName = event.key;
	button = pickButton(keyName);
  document.getElementById(button).style.visibility = 'hidden';
}, false);

function pickButton (keyName){
  var button = null;
	switch(keyName){
  	case 'q': button = "redButton";    break;
    case 'w': button = "yellowButton"; break;
  	case 'e': button = "greenButton";  break;
  	case 'r': button = "blueButton";   break;
    default : break;
  }
  return button;
}
