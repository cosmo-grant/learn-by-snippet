def response_simulator():
    raise ConnectionError
    yield "ok"


responses = response_simulator()

for _ in range(2):
    try:
        response = next(responses)
    except ConnectionError:
        print("connection error")
    else:
        print(response)
