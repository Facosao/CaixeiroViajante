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

    constructor(pathArray: Array<number> = []) {
        this.path = pathArray;
    }

    push(value: number) {
        this.path.push(value);
    }

    remove(atIndex: number) {
        this.path.splice(atIndex, 1);
    }

    totalDistance(points: Array<Point>): number {
        let totalDistance: number = 0;
        for (let i = 0; i < this.path.length; i++) {
            const dx = Math.abs(points[this.path[i]].x - points[this.path[(i+1) % this.path.length]].x);
            const dy = Math.abs(points[this.path[i]].y - points[this.path[(i+1) % this.path.length]].y);
            const dist = Math.abs(Math.hypot(dx, dy)); // Unnecessary abs()?
            totalDistance += dist;
        }
        return totalDistance;
    }

    isShorterThan(path: Path): boolean {
        const hostDistance = this.path.totalDistance();
        const guestDistance = path.totalDistance();
        
        return hostDistance < guestDistance;        
    }
}