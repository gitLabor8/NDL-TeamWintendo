import serial
import picamera
import cv2
import numpy as np
from PIL import Image

#Opens the camera module and sets the resolution on the Rpi so it can be used to take pictures.
camera = picamera.PiCamera()
camera.resolution = (1280, 720)

#Opens the serial port where the Arduino is hooked up to, so it can be read.
ser = serial.Serial("/dev/ttyUSB0", 9600)


#Continues while loop to check if we get input form the Arduino and if a picture must then be taken.
while True:
        #Checks if the arduino sends the signal to take a picture, if so sets a timer (to measure delay) and takes a picture and saves it.
	if(int (ser.readline().rstrip()) == 1):

        # Take each frame
        _, frame = Image.open('testimage9.jpg')

        # Convert BGR to HSV
        hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)

        # define range of white color in HSV
        lower_white = np.array([180,180,180])
        upper_white = np.array([255,255,255])

        # Threshold the HSV image to get only white colors
        mask = cv2.inRange(hsv, lower_white, upper_white)

        cv2.imshow('frame',frame)
        cv2.imshow('mask',mask)

    cv2.destroyAllWindows()