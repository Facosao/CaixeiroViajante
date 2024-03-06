import { Point } from "./point.js";
import { Draw } from "./draw.js";

export function nearest_neighbor(points: Array<Point>) {
    let path: Array<number> = [];
    path.push(0);

    for (let i = 0; i < points.length; i++) {
        Draw.clearScreen();
        Draw.circle(points[i], "red");
        Draw.points(points);
        
        let smallest_distance: number | null = null;
        let smallest_distance_index: number | null = null;
        

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
