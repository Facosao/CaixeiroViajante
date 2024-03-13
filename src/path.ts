import { Point } from "./point.js";

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

class Path {
    private path: Array<number>;
    private points: Array<Point>;

    constructor(points: Array<Point>, pathArray: Array<number> = []) {
        this.path = pathArray;
        this.points = points;
    }

    push(value: number) {
        this.path.push(value);
    }

    remove(atIndex: number) {
        this.path.splice(atIndex, 1);
    }

    totalDistance(): number {
        let totalDistance: number = 0;
        for (let i = 0; i < this.path.length; i++) {
            const dx = Math.abs(this.points[this.path[i]].x - this.points[this.path[(i+1) % this.path.length]].x);
            const dy = Math.abs(this.points[this.path[i]].y - this.points[this.path[(i+1) % this.path.length]].y);
            const dist = Math.abs(Math.hypot(dx, dy)); // Unnecessary abs()?
            totalDistance += dist;
        }
        return totalDistance;
    }

    isShorterThan(path: Path): boolean {
        const hostDistance = this.totalDistance();
        const guestDistance = path.totalDistance();

        return hostDistance < guestDistance;        
    }
}