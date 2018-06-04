

var express = require("express");
var app = express();
var http = require("http");
var path = require('path');

app.set('view engine', 'ejs');
app.get('/', function (req, res) {
  res.render('guitar');
});

app.use(express.static(path.join(__dirname, 'views')));

var tuple = '';
var http_server = http.createServer(app).listen(3000)
var http_io = require("socket.io")(http_server);
http_io.on("connection", function(httpsocket) {
    httpsocket.on('python-message', function(fromPython) {
        httpsocket.broadcast.emit('message', fromPython);
        console.log('message', fromPython);
        tuple = fromPython;
        console.log(tuple)
        app.use(function(err, req, res, next) {
          res.send(tuple);
        });
    });
});
