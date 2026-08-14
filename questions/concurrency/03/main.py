from time import thread_time


def cpu_bound():
    start = thread_time()
    while thread_time() - start < 3:
        continue
    print("done")


cpu_bound()
cpu_bound()
print("here")
