def gen():
    yield 1
    yield 2
    return 3


g = gen()
print(g.send(None))
print(g.send(None))
try:
    g.send(None)
except StopIteration as exc:
    print(exc.value)
