import { Draw } from "./draw.js";
import { Point } from "./point.js";
import { totalDistance } from "./path.js";

function clone(arr: Array<number>): Array<number> {
    return JSON.parse(JSON.stringify(arr));
}

export function range(n: number): Array<number> {
    const arr: Array<number> = [];
    for (let i = 0; i < n; i++) {
        arr.push(i);
    }
    return arr;
}

function generateAllPermutations(vec: Array<number>): Array<Array<number>> {
    const result: Array<Array<number>> = [];
    const f = (vec: Array<number>, temp: Array<number>) => {
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
    }
    
    f(vec, []);
    return result;
}

export function bruteForce(points: Array<Point>) {
    const permutations = generateAllPermutations(range(points.length));
    let best_distance: number | null = null;
    let best_path: Array<number> = [];

    for (const path of permutations) {
        const pathDistance = totalDistance(points, path);
        if ((best_distance === null) || (pathDistance < best_distance)) {
            best_distance = pathDistance;
            best_path = path;
        }

        Draw.path(points, path, "black");
    }

    console.log("brute_force = " + totalDistance(points, best_path));
    Draw.path(points, best_path, "green");
}