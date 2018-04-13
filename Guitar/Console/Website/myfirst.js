// var http = require('http');
var fs = require('fs');
// let jsonData = require('./Song.json');
// var jsonString = JSON.stringify(jsonData);

var filePath = './notes.json';
var file = fs.readFileSync(filePath);

var express = require('express');
var app = express();
var path = require('path');

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  fs.watchFile(filePath, function () {
    console.log('File1 Changed ...');
    file = fs.readFileSync(filePath);
    console.log('File1 content at : ' + new Date() + ' is \n ' + file);
  });
  var data = {data: [file]};
  res.render('guitar', {data: data});
});

app.use(express.static(path.join(__dirname, 'Views')));

app.listen(8080);

console.log('Initial File content : ' + file);

fs.watchFile(filePath, function () {
  console.log('File1 Changed ...');
  file = fs.readFileSync(filePath);
  console.log('File1 content at : ' + new Date() + ' is \n ' + file);
});

// let jsonData = require('./Song.json');

// var jsonString = JSON.stringify(jsonData);

/** http.createServer(function (req, res) {
  if (req === 'guitar.html') {
    fs.readFile('guitar.html', function (err, data) {
      if (err) throw err;
      res.writeHead(200, {'Content-Type': 'text/html'});
      // res.write(data);
    });
  }
  if (req === 'guitar.css') {
    fs.readFile('guitar.css', function (err, data) {
      if (err) throw err;
      res.writeHead(200, {'Content-Type': 'text/html'});
      // res.write(data);
    });
  }
  res.end();
}).server.listen(8080);
console.log('Server running at http://localhost:8080');
// console.log(jsonData); **/
