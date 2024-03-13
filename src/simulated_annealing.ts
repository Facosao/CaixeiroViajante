import { Point } from "./point.js";

function simulatedAnnealing(points: Array<Point>) {

    const cooldownRate = 0.0005;
    let temperature = 100_000;
    let failCounter = 0;

    let currentDistance;
    let currentPath;

    let bestDistance;
    let bestPath;

    while ((temperature > 1) && (failCounter < 50)) {
        const newPath;
        const newDistance;
        let shouldUseSolution = false;

        if (newDistance < currentDistance) {
            shouldUseSolution = true;
        } else if (Math.exp((currentDistance - newDistance) / temperature) > Math.random()) {
            shouldUseSolution = true;
        }

        if (shouldUseSolution) {
            currentDistance = newDistance;
            currentPath = newPath;
            failCounter = 0;
        }

        if (newDistance < bestDistance) {
            bestDistance = newDistance;
            bestPath = newPath;
        }

        temperature *= (1 - cooldownRate);
    }

}