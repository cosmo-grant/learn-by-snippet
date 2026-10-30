from time import sleep


def io_bound():
    sleep(3)
    print("done")


io_bound()
io_bound()
print("here")
