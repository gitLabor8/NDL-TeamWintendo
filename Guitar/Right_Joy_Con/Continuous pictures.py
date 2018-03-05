import picamera

camera = picamera.PiCamera()
counter = 0

while(True):
    print("Gonna take a picture")
    camera.resolution = (1280, 720)
    camera.capture("/home/pi/shared/testimage{0}.jpg".format(counter))
    print("Took a picture")
    counter += 1
