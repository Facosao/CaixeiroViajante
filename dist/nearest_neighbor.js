import { Draw } from "./draw.js";
import { range } from "./brute_force.js";
import { totalDistance } from "./path.js";
export function nearestNeighbor(points) {
    const path = [];
    const unvisited = range(points.length);
    path.push(0);
    unvisited.splice(unvisited.indexOf(0), 1);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function step(timestamp) {
        if (path.length < points.length) {
            const index = path[path.length - 1];
            let smallest_distance = null;
            let smallest_distance_index = null;
            Draw.path(points, path, "black");
            for (const idx of unvisited) {
                const distance = points[index].distanceTo(points[idx]);
                if ((smallest_distance === null) || (distance < smallest_distance)) {
                    smallest_distance = distance;
                    smallest_distance_index = idx;
                }
                Draw.line(points[index], points[idx], "red");
                Draw.circle(points[idx]);
            }
            if (smallest_distance_index !== null) {
                path.push(smallest_distance_index);
                unvisited.splice(unvisited.indexOf(smallest_distance_index), 1);
            }
            requestAnimationFrame(step);
        }
        else {
            console.log("nearest_neighbor = " + totalDistance(points, path));
            Draw.path(points, path, "green");
        }
    }
    requestAnimationFrame(step);
}
