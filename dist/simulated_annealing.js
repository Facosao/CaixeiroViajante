import { Path } from "./path.js";
import { Draw } from "./draw.js";
export function simulatedAnnealing(points) {
    const cooldownRate = 0.0005;
    let temperature = 100000;
    let failCounter = 0;
    let newPath = Path.initialGuess(points);
    let currentPath = newPath;
    let bestPath = newPath;
    //timestamp: DOMHighResTimeStamp
    function step() {
        let iter = 0;
        let previousBest = bestPath.fit();
        while ((temperature > 1) && (failCounter >= 0)) {
            newPath.mutate();
            let shouldUseSolution = false;
            const newFit = newPath.fit();
            const curFit = currentPath.fit();
            if (newPath.fit() < currentPath.fit()) {
                failCounter += 1;
                //console.log("cur", currentPath.fit(), "new", newPath.fit());
            }
            if ((newPath.fit() < currentPath.fit()) ||
                (Math.exp((currentPath.fit() - newPath.fit()) / temperature) > Math.random())) {
                shouldUseSolution = true;
            }
            if (shouldUseSolution) {
                currentPath = Path.clone(newPath);
                //failCounter += 1;
            }
            else {
                //failCounter -= 1;
            }
            const bestFit = bestPath.fit();
            if (newPath.fit() < bestPath.fit()) {
                if (previousBest < bestPath.fit()) {
                    throw new Error("best = " + bestPath.fit() + "previous = " + previousBest);
                }
                previousBest = bestPath.fit();
                bestPath = Path.clone(newPath);
                //failCounter += 1;
            }
            temperature *= (1 - cooldownRate);
            iter += 1;
            if ((iter % 1000) == 0) {
                console.log("iter", iter, "best = ", bestPath.fit(), "counter = ", failCounter);
            }
            Draw.path(bestPath.points, bestPath.raw, "black");
            //requestAnimationFrame(step);
            //step();
        } //else {
        Draw.path(bestPath.points, bestPath.raw, "green");
        console.log("simulated_annealing = " + bestPath.fit());
        //}
    }
    requestAnimationFrame(step);
}
