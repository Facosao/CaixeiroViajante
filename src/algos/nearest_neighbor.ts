import { Point } from "../data/point.js";
import { Draw } from "../draw.js";
import { range } from "../util.js";
import { Path } from "../data/path.js";

export function nearestNeighbor(points: Array<Point>, bestPath: Path) {
    let startIndex = 0;

    function step() {
        if (startIndex >= points.length) {
            Draw.log("Distância total = " + bestPath.fit());
            Draw.path(points, bestPath.raw, "green");
            return;
        }


        const path: Array<number> = [];
        const unvisited = range(points.length);
        
        path.push(startIndex);
        unvisited.splice(unvisited.indexOf(startIndex), 1);  

        while (path.length < points.length) {
            const index = path[path.length - 1];
            let smallest_distance: number | null = null;
            let smallest_distance_index: number | null = null;
            
            //Draw.path(points, path, "black");

            for (const idx of unvisited) {
                const distance = points[index].distanceTo(points[idx]);
                if ((smallest_distance === null) || (distance < smallest_distance)) {
                    smallest_distance = distance;
                    smallest_distance_index = idx;
                }
                //Draw.line(points[index], points[idx], "red");
                //Draw.circle(points[idx]);
            }

            if (smallest_distance_index !== null) {
                path.push(smallest_distance_index);
                unvisited.splice(unvisited.indexOf(smallest_distance_index), 1);
            }
        }
        
        startIndex += 1;
        const currentPath = new Path(points, path);
        if (currentPath.fit() < bestPath.fit()) {
            bestPath.swap(currentPath.raw);
        }
        
        Draw.log("Início = " + startIndex + "\nDistância atual = " + currentPath.fit());
        Draw.path(points, currentPath.raw, "black");
        requestAnimationFrame(step);
    }

    step();
}
