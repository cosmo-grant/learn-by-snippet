def generator():
    yield 1
    yield 2


g = generator()
print(next(g))
g.close()
print(next(g))
