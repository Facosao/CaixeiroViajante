import { Draw } from "./draw.js";
export function nearest_neighbor(points) {
    for (let i = 0; i < points.length; i++) {
        let smallest_distance = null;
        let smallest_distance_index = null;
        Draw.clearScreen();
        Draw.points(points);
        Draw.circle(points[i], "red");
        for (let j = i + 1; j < i + points.length; j++) {
            const distance = points[i].distanceTo(points[j % points.length]);
            if ((smallest_distance === null) || (distance < smallest_distance)) {
                smallest_distance = distance;
                smallest_distance_index = j;
            }
            Draw.line(points[i], points[j % points.length], "red");
        }
    }
}
