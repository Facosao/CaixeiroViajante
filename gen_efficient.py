def gen_efficient(vec: list[int], temp: list[int], index: int):
    if index == len(temp):
        print(temp)
        return

    for i in range(index, index + len(vec)):
        temp[index] = vec[i % len(vec)]
        gen_efficient(vec, temp, index + 1)


gen_efficient([1, 2, 3], [0, 0, 0], 0)
