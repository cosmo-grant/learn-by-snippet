import socket
from threading import Thread


def client():
    sock = socket.create_connection(("127.0.0.1", 44444))
    sock.send(b"x")


srv1 = socket.socket()
srv1.bind(("127.0.0.1", 44444))
srv1.listen()
Thread(target=client).start()
conn, _ = srv1.accept()
print(conn.recv(1))
conn.close()
srv1.close()

srv2 = socket.socket()
srv2.bind(("127.0.0.1", 44444))
srv2.listen()
Thread(target=client).start()
print(conn.recv(1))
conn.close()
srv1.close()
