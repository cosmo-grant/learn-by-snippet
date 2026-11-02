def generator():
    while True:
        try:
            yield 1
        except Exception as exception:
            yield 2


g = generator()
print(next(g))
print(g.throw(ValueError))
print(next(g))
