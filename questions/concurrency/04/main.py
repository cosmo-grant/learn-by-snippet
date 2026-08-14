from threading import Thread
from time import thread_time


def cpu_bound():
    start = thread_time()
    while thread_time() - start < 3:
        continue
    print("done")


thread1 = Thread(target=cpu_bound)
thread2 = Thread(target=cpu_bound)
thread1.start()
thread2.start()
print("here")
