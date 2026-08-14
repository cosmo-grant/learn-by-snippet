from time import thread_time
from multiprocessing import Process


def cpu_bound():
    start = thread_time()
    while thread_time() - start < 3:
        continue
    print("done")


if __name__ == "__main__":
    # running on multicore machine
    proc1 = Process(target=cpu_bound)
    proc2 = Process(target=cpu_bound)
    proc1.start()
    proc2.start()
    proc1.join()
    proc2.join()
    print("here")
