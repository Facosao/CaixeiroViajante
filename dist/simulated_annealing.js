import { Path } from "./path.js";
export function simulatedAnnealing(points) {
    const cooldownRate = 0.0005;
    let temperature = 100000;
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
        }
        else {
            failCounter += 1;
        }
        if (newPath.fit() < bestPath.fit()) {
            bestPath = newPath;
        }
        temperature *= (1 - cooldownRate);
    }
}
