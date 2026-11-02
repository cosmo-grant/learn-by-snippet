def f(x):
    if x:
        return 1
    yield 2


print(*f(False))
print("blah")
print(*f(True))
