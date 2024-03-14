import { Point } from "./point.js";
import { range } from "./brute_force.js";

export function totalDistance(points: Array<Point>, path: Array<number>): number {
    let totalDistance: number = 0;
    for (let i = 0; i < path.length; i++) {
        const dx = Math.abs(points[path[i]].x - points[path[(i+1) % path.length]].x);
        const dy = Math.abs(points[path[i]].y - points[path[(i+1) % path.length]].y);
        const dist = Math.abs(Math.hypot(dx, dy)); // Unnecessary abs()?
        totalDistance += dist;
    }
    return totalDistance;
}

export class Path {
    public raw: Array<number>;
    public length: number;

    private points: Array<Point>;
    private fitness: number | null = null;

    constructor(points: Array<Point>, rawPath: Array<number> = []) {
        this.raw = rawPath;
        this.points = points;
        this.length = this.raw.length;
    }

    static initialGuess(points: Array<Point>): Path {
        const available = range(points.length);
        const result: Array<number> = [];
    
        while (available.length > 0) {
            const rng = Math.floor(Math.random() * points.length);
            if (rng < available.length) {
                const aux = available[rng];
                available.splice(rng, 1)
                result.push(aux);
            }
        }
    
        return new Path(points, result);
    }

    fit(): number {
        if (this.raw.length !== this.points.length) {
            throw new Error("Can't calculate fitness for an incomplete path!");
        }

        if (this.fitness !== null) {
            return this.fitness;
        }
        
        this.fitness = 0;
        for (let i = 0; i < this.raw.length; i++) {
            const dx = Math.abs(this.points[this.raw[i]].x - this.points[this.raw[(i+1) % this.raw.length]].x);
            const dy = Math.abs(this.points[this.raw[i]].y - this.points[this.raw[(i+1) % this.raw.length]].y);
            const dist = Math.abs(Math.hypot(dx, dy)); // Unnecessary abs()?
            this.fitness += dist;
        }
        return this.fitness;
    }

    mutate() {
        const startIndex = Math.floor(Math.random() * (this.raw.length - 1));
        const endIndex = Math.floor(Math.random() * (this.raw.length - startIndex)) + startIndex;

        
        for (let i = startIndex; i <= endIndex; i++) {
            const aux = this.raw[i];
            this.raw[i] = this.raw[endIndex - (i - startIndex)];
            this.raw[endIndex - (i - startIndex)] = aux;
        }

        /*
        const startIndex = Math.floor(Math.random() * (arr.length - 1));
        const endIndex = Math.floor(Math.random() * (arr.length - startIndex)) + startIndex;
        console.log("start = " + startIndex + ", end = " + endIndex);

        const aux: Array<number> = []
        for (let i = startIndex; i < endIndex; i++) {
            aux.push(arr[i]);
        }

        aux.reverse();

        for (let i = startIndex; i < endIndex; i++) {
            arr[i] = aux[i];
        } 

        console.log(arr);
        */
    }
}