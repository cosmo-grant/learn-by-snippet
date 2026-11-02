from contextlib import contextmanager


@contextmanager
def func():
    print("foo")
    yield "bar"
    print("baz")


with func() as blah:
    print(blah)
