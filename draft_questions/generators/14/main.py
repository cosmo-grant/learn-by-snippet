def func():
    output = 0
    while True:
        new = yield output
        output = new if new is not None else output


genr = func()
print(genr.send(5))
print(next(genr))
