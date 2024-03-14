import { Draw } from "./draw.js";
import { totalDistance } from "./path.js";
function clone(arr) {
    return JSON.parse(JSON.stringify(arr));
}
export function range(n) {
    const arr = [];
    for (let i = 0; i < n; i++) {
        arr.push(i);
    }
    return arr;
}
function generateAllPermutations(vec) {
    const result = [];
    const f = (vec, temp) => {
        for (const num of vec) {
            const new_temp = clone(temp);
            new_temp.push(num);
            const new_vec = clone(vec);
            for (let i = 0; i < vec.length; i++) {
                if (vec[i] === num) {
                    new_vec.splice(i, 1);
                }
            }
            f(new_vec, new_temp);
        }
        if (vec.length === 0) {
            result.push(clone(temp));
        }
    };
    f(vec, []);
    return result;
}
export function bruteForce(points) {
    const permutations = generateAllPermutations(range(points.length));
    let best_distance = null;
    let best_path = [];
    let idx = 0;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function step(timestamp) {
        if (idx < permutations.length) {
            const path = permutations[idx];
            const pathDistance = totalDistance(points, path);
            if ((best_distance === null) || (pathDistance < best_distance)) {
                best_distance = pathDistance;
                best_path = path;
            }
            Draw.path(points, path, "black");
            idx += 1;
            requestAnimationFrame(step);
        }
        else {
            console.log("brute_force = " + totalDistance(points, best_path));
            Draw.path(points, best_path, "green");
        }
    }
    requestAnimationFrame(step);
}
