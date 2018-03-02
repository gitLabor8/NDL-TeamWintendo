import picamera
from PIL import Image

im = Image.open('test.jpg')
pixelMap = im.load()

whitePixelAmount = 0

img = Image.new( im.mode, im.size)
pixelsNew = img.load()
for x in range(img.size[0]):
    for y in range(img.size[1]):
        r, g, b = pixelMap[x,y]
        if r > 210 and g > 210 and b > 210:
            whitePixelAmount += 1
            pixelMap[x,y] = (0, 0, 0)
        else:
            pixelsNew[x,y] = pixelMap[x,y]
print(whitePixelAmount)
im.close()
img.save("output.jpg")
img.close()
