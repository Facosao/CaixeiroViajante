import { Path } from "./path.js";
import { Draw } from "./draw.js";
export function simulatedAnnealing(points) {
    const cooldownRate = 0.0005;
    let temperature = 100000;
    let currentPath = Path.initialGuess(points);
    let bestPath = currentPath;
    //timestamp: DOMHighResTimeStamp
    function step() {
        let iter = 0;
        while (temperature > 1) {
            const newPath = Path.clone(currentPath);
            newPath.mutate();
            let shouldUseSolution = false;
            if ((newPath.fit() < currentPath.fit()) ||
                (Math.exp((currentPath.fit() - newPath.fit()) / temperature) > Math.random())) {
                shouldUseSolution = true;
            }
            if (shouldUseSolution) {
                currentPath = newPath;
                //failCounter += 1;
            }
            else {
                //failCounter -= 1;
            }
            if (newPath.fit() < bestPath.fit()) {
                bestPath = newPath;
                //failCounter += 1;
            }
            temperature *= (1 - cooldownRate);
            iter += 1;
            if ((iter % 1000) == 0) {
                console.log("iter", iter, "best = ", bestPath.fit());
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
