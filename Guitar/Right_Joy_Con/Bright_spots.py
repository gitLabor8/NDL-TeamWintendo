#!/usr/bin/python2.7
import serial
import picamera
from imutils import contours
from skimage import measure
import numpy as np
import argparse
import imutils
import cv2

from socketIO_client import SocketIO, LoggingNamespace
 
#Opens the camera module and sets the resolution on the Rpi so it can be used to take pictures.
camera = picamera.PiCamera()
camera.resolution = (1280, 720)

#Opens the serial port where the Arduino is hooked up to, so it can be read.
ser = serial.Serial("/dev/ttyUSB0", 9600)

buttonAreas = []
buttonResults = []

#Continues while loop to check if we get input form the Arduino and if a picture must then be taken.
while True:
    #Checks if the arduino sends the signal to take a picture, if so takes a picture and saves it.
    if(int (ser.readline().rstrip()) == 1):
        break

camera.capture("/home/pi/Desktop/NDL-TeamWintendo/Guitar/Console/The_Image.jpg")

# load the image, convert it to grayscale, and blur it
img = cv2.imread("/home/pi/Desktop/NDL-TeamWintendo/Guitar/Console/The_Image.jpg",0)
blurred = cv2.GaussianBlur(img, (11, 11), 0)

# threshold the image to reveal light regions in the
# blurred image
thresh = cv2.threshold(blurred, 240, 255, cv2.THRESH_BINARY)[1]

# perform a series of erosions and dilations to remove
# any small blobs of noise from the thresholded image
thresh = cv2.erode(thresh, None, iterations=2)
thresh = cv2.dilate(thresh, None, iterations=4)

# perform a connected component analysis on the thresholded
# image, then initialize a mask to store only the "large"
# components
labels = measure.label(thresh, neighbors=8, background=0)
mask = np.zeros(thresh.shape, dtype="uint8")
 
# loop over the unique components
for label in np.unique(labels):
    # if this is the background label, ignore it
    if label == 0:
        continue
 
    # otherwise, construct the label mask and count the
    # number of pixels
    labelMask = np.zeros(thresh.shape, dtype="uint8")
    labelMask[labels == label] = 255
    numPixels = cv2.countNonZero(labelMask)
 
    # if the number of pixels in the component is sufficiently
    # large, then add it to our mask of "large blobs"
    if numPixels > 300:
        mask = cv2.add(mask, labelMask)


# find the contours in the mask, then sort them from left to
# right
cnts = cv2.findContours(mask.copy(), cv2.RETR_EXTERNAL,
        cv2.CHAIN_APPROX_SIMPLE)
cnts = cnts[0] if imutils.is_cv2() else cnts[1]
cnts = contours.sort_contours(cnts)[0]

# loop over the contours
for (i,c) in enumerate(cnts):
    # draw the bright spot on the image
    x,y,w,h = cv2.boundingRect(c)
    buttonAreas.append([x, w, y, h])
    cv2.rectangle(img,(x,y),(x+w,y+h),(0,255,0),2)
    
    
for i in range(0, len(buttonAreas)):
    buttonResults.append(0)

while True:
    if(int (ser.readline().rstrip()) == 1):
        camera.capture("/home/pi/Desktop/NDL-TeamWintendo/Guitar/Console/The_Image.jpg")
	
        # load the image, convert it to grayscale, and blur it
        image = cv2.imread("/home/pi/Desktop/NDL-TeamWintendo/Guitar/Console/The_Image.jpg",0)
        blurred = cv2.GaussianBlur(image, (11, 11), 0)

        # threshold the image to reveal light regions in the
        # blurred image
        thresh = cv2.threshold(blurred, 240, 255, cv2.THRESH_BINARY)[1]
        
        # perform a series of erosions and dilations to remove
        # any small blobs of noise from the thresholded image
        thresh = cv2.erode(thresh, None, iterations=2)
        thresh = cv2.dilate(thresh, None, iterations=4)    
        
        height, width = img.shape

        for (i,c) in enumerate(buttonAreas):
            whitepixel = 0
            blackpixel = 0
            i_x = buttonAreas[i][0]
            i_y = buttonAreas[i][2]
            for x in range(i_x, i_x + int(buttonAreas[i][1])-1):
                for y in range(i_y, i_y + int(buttonAreas[i][3])-1):
                    imVal = thresh[y, x]
                    if imVal == 255:
                        whitepixel += 1
                    else:
                        blackpixel += 1
            if whitepixel*3 < blackpixel:
                buttonResults[i] = 1
            else:
                buttonResults[i] = 0
        
        with SocketIO('localhost', 3000, LoggingNamespace) as socketIO:
            socketIO.emit('python-message', buttonResults)
                
        for i in range(0, len(buttonAreas)):
            buttonResults[i] = 0
                
camera.close()










