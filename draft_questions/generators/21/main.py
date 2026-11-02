def generator():
    try:
        yield 1
        yield 2
    finally:
        print("made it")


g = generator()
print(next(g))
g.close()
print(next(g))
