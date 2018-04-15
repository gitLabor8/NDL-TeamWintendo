var fs = require('fs');
var filePath = './notes.json';
var file = fs.readFileSync(filePath);

var express = require('express');
var app = express();
var path = require('path');

app.set('view engine', 'ejs');

// The app renders its all of the files (.js, .html, .css) and the notes.json contents
app.get('/', function (req, res) {
  var data = {data: [file]};
  res.render('guitar', {data: data});
});

// The app uses files from the path given
app.use(express.static(path.join(__dirname, 'views')));

// Puts the app on port 3000
app.listen(3000);

// Listens to changes in the notes.json file
fs.watchFile(filePath, function () {
  console.log('File Changed ...');
  file = fs.readFileSync(filePath);
  console.log('File content at : ' + new Date() + ' is \n ' + file);
});
