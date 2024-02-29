export function generateAllPermutations(
    vec: Array<number>,
    temp: Array<number>,
    index: number,
    result: Array<Array<number>> = []
): Array<Array<number>> {
    for (const idx in vec) {
        temp[idx] = vec[idx];
        generateAllPermutations(vec, temp, index + 1)
    }

    if (index === vec.length) { // Copy permutation to result
        console.log(temp);
        result.push(JSON.parse(JSON.stringify(temp)));
    }


    if (index === 0) { // First call returns final Array
        return result;
    }

    throw new Error("unreachable!");
}