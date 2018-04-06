import picamera
from PIL import Image

im = Image.open('testimage1.jpg')
pixelMap = im.load()

whitePixelbutton1 = 0
whitePixelbutton2 = 0
whitePixelbutton3 = 0
whitePixelbutton4 = 0

img = Image.new( im.mode, im.size)
pixelsNew = img.load()
for x in range(75, 125):
    for y in range(375, 425):
        r, g, b = pixelMap[x,y]
        if r > 180 and g > 180 and b > 180:
            whitePixelbutton1 += 1
            pixelsNew[x,y] = (212, 212, 212)
        else:
            pixelsNew[x,y] = pixelMap[x,y]
    
for x in range(425, 475):
    for y in range(550, 600):
        r, g, b = pixelMap[x,y]
        if r > 180 and g > 180 and b > 180:
            whitePixelbutton2 += 1
            pixelsNew[x,y] = (212, 212, 212)
        else:
            pixelsNew[x,y] = pixelMap[x,y]
            
for x in range(725, 775):
    for y in range(625, 675):
        r, g, b = pixelMap[x,y]
        if r > 180 and g > 180 and b > 180:
            whitePixelbutton3 += 1
            pixelsNew[x,y] = (212, 212, 212)
        else:
            pixelsNew[x,y] = pixelMap[x,y]

for x in range(1175, 1225):
    for y in range(355, 405):
        r, g, b = pixelMap[x,y]
        if r > 180 and g > 180 and b > 180:
            whitePixelbutton4 += 1
            pixelsNew[x,y] = (212, 212, 212)
        else:
            pixelsNew[x,y] = pixelMap[x,y]
            
print('White pixels button 1:')
print( whitePixelbutton1)
print('White pixels button 2:')
print( whitePixelbutton2)
print('White pixels button 3:')
print( whitePixelbutton3)
print('White pixels button 4:')
print( whitePixelbutton4)
im.close()
img.save("output.jpg")
img.close()