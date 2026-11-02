def counter(maximum):
    i = 0
    while i < maximum:
        yield i
        i += 1


it = counter(3)
for _ in range(4):
    print(next(it))
