#!/usr/bin/python2.7
import serial
import picamera
from imutils import contours
import skimage #import measure
import numpy as np
import argparse
import imutils
import cv2
 
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

ap = argparse.ArgumentParser()
ap.add_argument("-i", "--image", required=True,
                            help="path to the image file")
args = vars(ap.parse_args())

# load the image, convert it to grayscale, and blur it
img = cv2.imread(args["/home/pi/Desktop/NDL-TeamWintendo/Guitar/Console/The_Image.jpg"])
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
blurred = cv2.GaussianBlur(gray, (11, 11), 0)

# threshold the image to reveal light regions in the
# blurred image
thresh = cv2.threshold(blurred, 180, 255, cv2.THRESH_BINARY)[1]

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
for c in enumerate(cnts):
    # draw the bright spot on the image
    (x, y, w, h) = cv2.boundingRect(c)
    ((cX, cY), radius) = cv2.minEnclosingCircle(c)
    buttonAreas.append([cX, cX * radius, cY, cY * radius])

while True:
    if(int (ser.readline().rstrip()) == 1):
        camera.capture("/home/pi/Desktop/NDL-TeamWintendo/Guitar/Console/The_Image.jpg")
	
    # load the image, convert it to grayscale, and blur it
    image = cv2.imread(args["/home/pi/Desktop/NDL-TeamWintendo/Guitar/Console/The_Image.jpg"])
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (11, 11), 0)

    # threshold the image to reveal light regions in the
    # blurred image
    thresh = cv2.threshold(blurred, 200, 255, cv2.THRESH_BINARY)[1]


    for c in enumerate(buttonAreas):
        whitepixel = 0
        blackpixel = 0
        for x in range(buttonAreas[c][0], buttonAreas[c][1]):
            for y in range(buttonAreas[c][2], buttonAreas[c][3]):
                imVal = image.at<uchar>(Point(x, y))
                if imVal == 255:
                    whitepixel += 1
                else:
                    blackpixel += 1
        if whitepixel > (2*blackpixel):
            buttonResults[c] = 0
        else:
            buttonResults[c] = 1











