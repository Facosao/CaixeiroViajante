import { Draw } from "./draw.js";
import { range } from "./brute_force.js";
import { totalDistance } from "./path.js";
export function nearest_neighbor(points) {
    let path = [];
    let unvisited = range(points.length);
    path.push(0);
    unvisited.splice(unvisited.indexOf(0), 1);
    while (path.length < points.length) {
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
        }
        if (smallest_distance_index !== null) {
            path.push(smallest_distance_index);
            unvisited.splice(unvisited.indexOf(smallest_distance_index), 1);
        }
    }
    console.log("nearest_neighbor = " + totalDistance(points, path));
    Draw.path(points, path, "green");
}
