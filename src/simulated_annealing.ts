import { Point } from "./point.js";
import { Path } from "./path.js";
import { range } from "./brute_force.js";



export function simulatedAnnealing(points: Array<Point>) {
    const cooldownRate = 0.0005;
    let temperature = 100_000;
    let failCounter = 0;

    let currentPath = new Path(points);
    let bestPath = new Path(points);
    let newPath = new Path(points);

    while ((temperature > 1) && (failCounter < 50)) {
        newPath = mutatePath(newPath);
        let shouldUseSolution = false;

        if ((newPath.fit() < currentPath.fit()) ||
            (Math.exp((currentPath.fit() - newPath.fit()) / temperature) > Math.random())) {
            shouldUseSolution = true;
        }

        if (shouldUseSolution) {
            currentPath = newPath;
            failCounter = 0;
        } else {
            failCounter += 1;
        }

        if (newPath.fit() < bestPath.fit()) {
            bestPath = newPath;
        }

        temperature *= (1 - cooldownRate);
    }

}