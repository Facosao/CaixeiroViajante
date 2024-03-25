import { Draw } from "../draw.js";
import { Point } from "../data/point.js";
import { Path } from "../data/path.js";

export function bruteForce(points: Array<Point>, bestPath: Path) {
    const permutations = Path.generateAllPaths(points);
    let idx = 0;

    function step() {
        while (idx < permutations.length) {
            const path = permutations[idx];

            if (path.fit() < bestPath.fit()) {
                bestPath.swap(path.raw);
            }

            idx += 1;

            if ((idx % 100) === 0) {
                Draw.log("n = " + idx);
                Draw.path(points, path.raw, "black");
                requestAnimationFrame(step);
                break;
            }
        }

        if (idx >= permutations.length) {
            Draw.log("Distância total = " + bestPath.fit());
            Draw.path(points, bestPath.raw, "green");
        }
    }

    step();
}