import serial
import picamera
from PIL import Image
import simplejson as json
import time

#Opens the camera module on the Rpi so it can be used to take pictures.
camera = picamera.PiCamera()
camera.resolution = (1280, 720)

#Opens the serial port where the Arduino is hooked up to, so it can be read.
ser = serial.Serial("/dev/ttyUSB0", 9600)

#This iterator is to prevent a file from being read from and written to at the same time.
fileIterator = 0

#Continues while loop to check if we get input form the Arduino and if a picture must then be taken.
while True:
        #Checks if the arduino sends the signal to take a picture.
	if(int (ser.readline().rstrip()) == 1):
            tic = time.clock()
            #Takes a picture.
            camera.capture("/home/pi/Desktop/NDL-TeamWintendo/Guitar/Console/The_Image.jpg")

            #Opens the picture that was taken and makes a pixelmap of it.
            im = Image.open('The_Image.jpg')
            pixelMap = im.load()

            #Creates the counters for the amount of white pixels on the place of the button on the picture.
            whitePixelbutton1 = 0
            whitePixelbutton2 = 0
            whitePixelbutton3 = 0
            whitePixelbutton4 = 0

            #Checks if every tenth pixel on the location of the last button is white enough.
            for x in range(75, 125):
                for y in range(375, 425):
                    r, g, b = pixelMap[x,y]
                    if r > 180 and g > 180 and b > 180:
                        whitePixelbutton4 += 1
                y = y + 4

            #Checks if every tenth pixel on the location of the third button is white enough.   
            for x in range(425, 475):
                for y in range(550, 600):
                    r, g, b = pixelMap[x,y]
                    if r > 180 and g > 180 and b > 180:
                        whitePixelbutton3 += 1
                y = y + 4

            #Checks if every tenth pixel on the location of the second button is white enough.
            for x in range(725, 775):
                for y in range(625, 675):
                    r, g, b = pixelMap[x,y]
                    if r > 180 and g > 180 and b > 180:
                        whitePixelbutton2 += 1
                y = y + 4

            #Checks if every tenth pixel on the location of the first button is white enough.
            for x in range(1175, 1225):
                for y in range(355, 405):
                    r, g, b = pixelMap[x,y]
                    if r > 180 and g > 180 and b > 180:
                        whitePixelbutton1 += 1
                y = y + 4

            #For every button converts the amount of "white" pixels to wheter it is a stroke or not.
            if(whitePixelbutton1 > 60):
                redButton = ''
            else:
                redButton = 'r '
                
            if(whitePixelbutton2 > 60):
                yellowButton = ''
            else:
                yellowButton = 'y '
                
            if(whitePixelbutton3 > 60):
                greenButton = ''
            else:
                greenButton = 'g '
                
            if(whitePixelbutton4 > 60):
                blueButton = ''
            else:
                blueButton = 'b '
                       
            #Prints the bits for every button in a json file.
            with open('JSONData{0}.json'.format(fileIterator), 'w') as file:
                json.dump(redButton + yellowButton + greenButton + blueButton, file)
            
            #Increaces the fileIterator so next time the value gets written to a drifrent file with 3 difrent files.
            fileIterator = (fileIterator + 1)%3
            
            #Closes the image.
            im.close()
            print(time.clock() - tic)