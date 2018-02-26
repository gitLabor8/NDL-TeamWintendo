from picamera import PiCamera

with picamera.PiCamera() as camera

while(True)
    print("Gonna take a picture")
    camera.resolution = (1280.720)
    counter = 0
    camera.capture("/home/pi/Desktop/test/testimage{0}.jpg".format(counter))
    print("Took a picture")
