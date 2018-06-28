from datetime import datetime
from socketIO_client import SocketIO, LoggingNamespace # socket.io@1.7.2
import sys

while True:
    with SocketIO('localhost', 3000, LoggingNamespace) as socketIO:
        try:
            buttons = (1, 0, 0, 1)
            socketIO.emit('python-message', buttons)
            socketIO.wait(seconds=1)
            buttons = (0, 0, 0, 0)
            socketIO.emit('python-message', buttons)
            socketIO.wait(seconds=1)
        except ConnectionError as ce:
            print("ConnectionError")
