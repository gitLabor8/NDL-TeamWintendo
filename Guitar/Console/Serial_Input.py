import serial

ser = serial.Serial("/dev/ttyUSB0", 9600)

while True:
	print(int (ser.readline().rstrip()))
