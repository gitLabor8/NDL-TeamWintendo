from playsound import playsound

buttons = open("buttons.txt", "r")

button1, button2, button3 = buttons.readlines()

if (button1 == "0" and button2 == "0" and button3 == "0"):
    playsound('Sounds\Sound1')

elif (button1 == "1" and button2 == "0" and button3 == "0"):
    playsound('Sounds\Sound2')

elif (button1 == "0" and button2 == "1" and button3 == "0"):
    playsound('Sounds\Sound3')

elif (button1 == "0" and button2 == "0" and button3 == "1"):
    playsound('Sounds\Sound4')

elif (button1 == "1" and button2 == "1" and button3 == "0"):
    playsound('Sounds\Sound5')

elif (button1 == "1" and button2 == "0" and button3 == "1"):
    playsound('Sounds\Sound6')

elif (button1 == "0" and button2 == "1" and button3 == "1"):
    playsound('Sounds\Sound7')

elif (button1 == "1" and button2 == "1" and button3 == "1"):
    playsound('Sounds\Sound8')








}

#playsound()