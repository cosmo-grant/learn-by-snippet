def gen(stream):
    for n in stream:
        if n % 2 == 0:
            return
        else:
            yield n


nums = [1, 3, 4, 1, 2]

for n in gen(nums):
    print(n)
