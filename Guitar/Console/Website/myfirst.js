var http = require('http');
var fs = require('fs');

let jsonData = require('./Song.json');

// var jsonString = JSON.stringify(jsonData);

http.createServer(function (req, res) {
  fs.readFile('OpenJson.html', function (err, data) {
    if (err) throw err;
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
}).listen(8080);
console.log('Server running at http://localhost:8080');
console.log(jsonData);
