import picamera
from PIL import Image, ImageFilter

image = Image.open('test.jpg')

whitePixelAmount = 0

# iterate over ever pixel in the image by iterating over each row and each column
for x in range(0, image.width):
    for y in range(0, image.height):
        # get the value of the current pixel
        black, white = image[x, y]
        if white > black:
            whitePixelAmount += 1
            image[x, y] = 0, 0, 255
