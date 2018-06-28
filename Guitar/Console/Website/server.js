var express = require("express");
var app = require('express')();
var http = require("http").Server(app);
var path = require('path');

app.set('view engine', 'ejs');
app.get('/', function(req, res) {
	res.render('guitar');
});

app.use(express.static(path.join(__dirname, 'views')));

var tuple = '';
var io = require("socket.io")(http);

io.on('connection', function(socket) {
	console.log('a user connected');
	io.emit('server-message', 'hello, server');

	socket.on('python-message', function(fromPython) {
		console.log("fromPython" + fromPython)
		io.emit('server-message', fromPython);
	})

	socket.on('message', function(message) {
		console.log(message);
	})
});
http.listen(3000);

//var http_server = http.createServer(app).listen(3000);

/** var io = require("socket.io")(http);//(http_server);
io.on("connection", function(socket) {

    console.log('Python connected');
    socket.on('python-message', function(fromPython) {
        io.emit('python-message', fromPython);
        socket.emit('python-message', fromPython);
        console.log('message', fromPython);
        tuple = fromPython;
        console.log(tuple);
        socket.send(tuple);
    });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
}); **/
