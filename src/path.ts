import { Point } from "./point.js";
import { range, clone } from "./brute_force.js";

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
    //public length: number;
    public points: Array<Point>;

    private fitness: number | null = null;

    constructor(points: Array<Point>, rawPath: Array<number> = []) {
        this.raw = rawPath;
        this.points = points;
        //this.length = this.raw.length;
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

    static clone(src: Path): Path {
        return new Path(src.points, clone(src.raw));
    }

    fit(): number {
        if (this.raw.length !== this.points.length) {
            throw new Error("Can't calculate fitness for an incomplete path!" + 
            "\nraw = " + this.raw.length + " points = " + this.points.length);
        }

        //if (this.fitness !== null) {
        //    return this.fitness;
        //}
        
        //this.fitness = 0;
        let distance = 0;
        for (let i = 0; i < this.raw.length; i++) {
            const dx = Math.abs(this.points[this.raw[i]].x - this.points[this.raw[(i+1) % this.raw.length]].x);
            const dy = Math.abs(this.points[this.raw[i]].y - this.points[this.raw[(i+1) % this.raw.length]].y);
            const dist = Math.abs(Math.hypot(dx, dy)); // Unnecessary abs()?
            //this.fitness += dist;
            distance += dist;
        }
        //return this.fitness;
        return distance;
    }

    mutate() {
        const startIndex = Math.floor(Math.random() * (this.raw.length - 1));
        const endIndex = Math.floor(Math.random() * (this.raw.length - startIndex)) + startIndex;
        //console.log("start = " + startIndex + ", end = " + endIndex);

        const aux: Array<number> = []
        for (let i = startIndex; i <= endIndex; i++) {
            aux.push(this.raw[i]);
        }

        aux.reverse();

        for (let i = 0; i < aux.length; i++) {
            this.raw[startIndex + i] = aux[i];
        } 

        this.fitness = null;
        //console.log(arr);
    }
}