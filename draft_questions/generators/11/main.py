def foo(x):
    yield from range(x, -1, -1)
    yield from range(x)


print(type(foo(3)))
