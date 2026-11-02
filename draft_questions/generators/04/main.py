numbers = [1, 2, 3, 4]
squares = [n**2 for n in numbers]
cubes = (n**3 for n in numbers)
print(*zip(squares, squares))
print(*zip(cubes, cubes))
