import { Point } from "./point.js";
import { range, clone, randInt } from "../util.js";

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
    public points: Array<Point>;
    public fitness: number | null = null;

    constructor(points: Array<Point>, rawPath: Array<number> = []) {
        this.raw = rawPath;
        this.points = points;
    }

    static initialGuess(points: Array<Point>): Path {
        const available = range(points.length);
        const result: Array<number> = [];
    
        while (available.length > 0) {
            const rng = randInt(points.length);
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

    isValidPath(): boolean {
        for (const value of this.raw) {
            if (this.raw.lastIndexOf(value) !== this.raw.indexOf(value)) {
                return false;
            }
        }

        return true;
    }

    fit(): number {
        if (this.raw.length !== this.points.length) {
            throw new Error("Can't calculate fitness for an incomplete path!" + 
            "\nraw = " + this.raw.length + " points = " + this.points.length);
        }

        if (this.fitness !== null) {
            return this.fitness;
        }
        
        if (!this.isValidPath()) {
            this.fitness = 999999999;
            return this.fitness; // Temp?
        }

        this.fitness = 0;
        for (let i = 0; i < this.raw.length; i++) {
            const dx = Math.abs(this.points[this.raw[i]].x - this.points[this.raw[(i+1) % this.raw.length]].x);
            const dy = Math.abs(this.points[this.raw[i]].y - this.points[this.raw[(i+1) % this.raw.length]].y);
            this.fitness += Math.abs(Math.hypot(dx, dy)); // Unnecessary abs()?;
        }
        
        return this.fitness;
    }

    mutate() {
        const startIndex = randInt(this.raw.length - 1);
        const endIndex = randInt(this.raw.length - startIndex) + startIndex;

        const aux: Array<number> = []
        for (let i = startIndex; i <= endIndex; i++) {
            aux.push(this.raw[i]);
        }

        aux.reverse();

        for (let i = 0; i < aux.length; i++) {
            this.raw[startIndex + i] = aux[i];
        } 

        this.fitness = null;
    }

    swap(raw: Array<number>) {
        this.raw = raw;
        this.fitness = null;
    }

    static generateAllPaths(points: Array<Point>): Array<Path> {
        const result: Array<Path> = [];
        const f = (vec: Array<number>, temp: Array<number>) => {
            for (const num of vec) {
                const new_temp = clone(temp);
                new_temp.push(num);
        
                const new_vec = clone(vec);
        
                for (let i = 0; i < vec.length; i++) {
                    if (vec[i] === num) {
                        new_vec.splice(i, 1);
                    }
                }
        
                f(new_vec, new_temp);
            }
        
            if (vec.length === 0) {
                result.push(new Path(points, clone(temp)));
            }
        }
        
        f(range(points.length), []);
        return result;
    }
}