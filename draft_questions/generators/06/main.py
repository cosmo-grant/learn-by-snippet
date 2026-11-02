def func():
    yield 1
    yield 2
    yield 3


print(type(func))
print(type(func()))
