def generator():
    try:
        yield 1
        yield 2
    except Exception as error:
        yield 3


g = generator()
print(next(g))
g.close()
print(next(g))
