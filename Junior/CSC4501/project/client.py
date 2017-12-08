import socket
import time
import sys

UDP_IP = sys.argv[1]
UDP_PORT = 5005
MESSAGE = "Hello, World!"

print "UDP target IP:", UDP_IP
print "UDP target port:", UDP_PORT
print "message:", MESSAGE

sock = socket.socket(socket.AF_INET, # Internet
                     socket.SOCK_DGRAM) # UDP

start = time.time()
while True:
    sock.sendto(MESSAGE, (UDP_IP, UDP_PORT))
    if time.time() - start > 30:
        break