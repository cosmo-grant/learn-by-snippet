def generator():
    while True:
        try:
            yield 1
        except TypeError as exception:
            yield 2


g = generator()
print(next(g))
print(g.throw(ValueError))
print(next(g))
