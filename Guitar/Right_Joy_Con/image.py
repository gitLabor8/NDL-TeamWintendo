import picamera
from PIL import Image
import simplejson as json

#Opens the picture that was taken and makes a pixelmap of it.
im = Image.open('testimage9.jpg')
pixelMap = im.load()

notes = {"R" : 0, "Y" : 0, "G" : 0, "B" : 0}

#Creates the counters for the amount of white pixels on the place of the button on the picture.
whitePixelbutton1 = 0
whitePixelbutton2 = 0
whitePixelbutton3 = 0
whitePixelbutton4 = 0

#Checks if every tenth pixel on the location of the first button is white enough.
for x in range(75, 125):
    for y in range(375, 425):
        r, g, b = pixelMap[x,y]
        if r > 180 and g > 180 and b > 180:
            whitePixelbutton1 += 1
    y = y + 9

#Checks if every tenth pixel on the location of the second button is white enough.   
for x in range(425, 475):
    for y in range(550, 600):
        r, g, b = pixelMap[x,y]
        if r > 180 and g > 180 and b > 180:
            whitePixelbutton2 += 1
    y = y + 9

#Checks if every tenth pixel on the location of the third button is white enough.
for x in range(725, 775):
    for y in range(625, 675):
        r, g, b = pixelMap[x,y]
        if r > 180 and g > 180 and b > 180:
            whitePixelbutton3 += 1
    y = y + 9

#Checks if every tenth pixel on the location of the last button is white enough.
for x in range(1175, 1225):
    for y in range(355, 405):
        r, g, b = pixelMap[x,y]
        if r > 180 and g > 180 and b > 180:
            whitePixelbutton4 += 1
    y = y + 9

#For every button: if there are enough white pixels, the button is not pressed and is set to 0. Otherwise,
#the button is pressed and is set to 1.
if(whitePixelbutton1 > 60):
    notes["R"] = 0
else:
    notes["R"] = 1
    
if(whitePixelbutton2 > 60):
    notes["Y"] = 0
else:
    notes["Y"] = 1
    
if(whitePixelbutton3 > 60):
    notes["G"] = 0
else:
    notes["G"] = 1
    
if(whitePixelbutton4 > 60):
    notes["B"] = 0
else:
    notes["B"] = 1

#Writes the button dictionary to a json file that can be read by the javascript node.
with open('notes.txt', 'w') as outfile:
	json.dump(notes, outfile)

#Closes the image.
im.close()