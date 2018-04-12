// var http = require('http');
var fs = require('fs');

var filePath1 = './notes1.json';
var filePath2 = './notes2.json';
var filePath3 = './notes3.json';
var file1 = fs.readFileSync(filePath1);
var file2 = fs.readFileSync(filePath2);
var file3 = fs.readFileSync(filePath3);

var express = require('express');
var app = express();
var path = require('path');

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/guitar.html'));
});

app.listen(8080);

console.log('Initial File content : ' + file1);
console.log('Initial File content : ' + file2);
console.log('Initial File content : ' + file3);

fs.watchFile(filePath1, function () {
  console.log('File1 Changed ...');
  file1 = fs.readFileSync(filePath1);
  console.log('File1 content at : ' + new Date() + ' is \n ' + file1);
});
fs.watchFile(filePath2, function () {
  console.log('File2 Changed ...');
  file2 = fs.readFileSync(filePath2);
  console.log('File2 content at : ' + new Date() + ' is \n ' + file2);
});
fs.watchFile(filePath3, function () {
  console.log('File3 Changed ...');
  file3 = fs.readFileSync(filePath3);
  console.log('File3 content at : ' + new Date() + ' is \n ' + file3);
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
