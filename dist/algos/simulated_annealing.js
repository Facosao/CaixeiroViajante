import { Path } from "../data/path.js";
import { Draw } from "../draw.js";
export function simulatedAnnealing(points, bestPath) {
    const cooldownRate = 0.0005;
    let temperature = 100_000;
    let iter = 0;
    let currentPath = Path.initialGuess(points);
    function step() {
        while (temperature > 1) {
            const newPath = Path.clone(currentPath);
            newPath.mutate();
            if ((newPath.fit() < currentPath.fit()) ||
                (Math.exp((currentPath.fit() - newPath.fit()) / temperature) > Math.random())) {
                // Use new solution even if it's worse
                currentPath = newPath;
            }
            if (newPath.fit() < bestPath.fit()) {
                bestPath.swap(newPath.raw);
            }
            temperature *= (1 - cooldownRate);
            iter += 1;
            if ((iter % 1000) == 0) {
                Draw.log("n = " + iter + "\nMenor distância = " + bestPath.fit());
                Draw.path(bestPath.points, bestPath.raw, "black");
                requestAnimationFrame(step);
                break;
            }
        }
        if (temperature <= 1) {
            Draw.log("Distância total = " + bestPath.fit());
            Draw.path(bestPath.points, bestPath.raw, "green");
        }
    }
    step();
}
