import pygame
from pygame import mixer

buttons = open("buttons.txt", "r")
pygame.mixer.init(44100, -16,2,2048)

button1, button2, button3, value0, value1 = buttons.readlines()

if (button1 == value0 and button2 == value0 and button3 == value0):
    pygame.mixer.music.load('/home/pi/Desktop/NDL-TeamWintendo/Guitar/Console/Sounds/Sound1.mp3')
    pygame.mixer.music.play()

elif (button1 == value1 and button2 == value0 and button3 == value0):
    pygame.mixer.music.load('/home/pi/Desktop/NDL-TeamWintendo/Guitar/Console/Sounds/Sound1.mp3')
    pygame.mixer.music.play()

elif (button1 == value0 and button2 == value1 and button3 == value0):
    pygame.mixer.music.load('/home/pi/Desktop/NDL-TeamWintendo/Guitar/Console/Sounds/Sound1.mp3')
    pygame.mixer.music.play()

elif (button1 == value0 and button2 == value0 and button3 == value1):
    ppygame.mixer.music.load('/home/pi/Desktop/NDL-TeamWintendo/Guitar/Console/Sounds/Sound1.mp3')
    pygame.mixer.music.play()

elif (button1 == value1 and button2 == value1 and button3 == value0):
    pygame.mixer.music.load('/home/pi/Desktop/NDL-TeamWintendo/Guitar/Console/Sounds/Sound1.mp3')
    pygame.mixer.music.play()

elif (button1 == value1 and button2 == value0 and button3 == value1):
    pygame.mixer.music.load('/home/pi/Desktop/NDL-TeamWintendo/Guitar/Console/Sounds/Sound1.mp3')
    pygame.mixer.music.play()

elif (button1 == value0 and button2 == value1 and button3 == value1):
    pygame.mixer.music.load('/home/pi/Desktop/NDL-TeamWintendo/Guitar/Console/Sounds/Sound1.mp3')
    pygame.mixer.music.play()playsound('Sounds\Sound7.mp3')

elif (button1 == value1 and button2 == value1 and button3 == value1):
    pygame.mixer.music.load('/home/pi/Desktop/NDL-TeamWintendo/Guitar/Console/Sounds/Sound1.mp3')
    pygame.mixer.music.play()playsound('Sounds\Sound8.mp3')

