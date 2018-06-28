var SerialPort = require('serialport');
var port = new SerialPort('/dev/ttyUSB0', {baudRate: 9600});

while (true){
  port.write('1', function(err) {
    return console.log('Error on write: ', err.message);
  }
},


// Switch port into flowing mode
port.on('data', function (data) {
  console.log('Data:', data);
});

// Read data that is available but keep the stream
// from entering flowing mode
port.on('readable', function () {
  console.log('Data:', port.read());
});
