const WIDTH = 800;
const HEIGHT = 600;
const MARGIN = 10;
const RADIUS = 7;
export class Point {
    constructor() {
        this.x = this.generateRandom(WIDTH - MARGIN);
        this.y = this.generateRandom(HEIGHT - MARGIN);
    }
    generateRandom(limit) {
        let attempt = Math.floor(Math.random() * limit);
        while (attempt < MARGIN) {
            attempt = Math.floor(Math.random() * limit);
        }
        return attempt;
    }
    checkOverlap(p) {
        if (this.distanceTo(p) <= (Point.radius * 2)) {
            return true;
        }
        else {
            return false;
        }
    }
    distanceTo(p) {
        const dx = Math.abs(this.x - p.x);
        const dy = Math.abs(this.y - p.y);
        return Math.abs(Math.hypot(dx, dy));
    }
}
Point.radius = RADIUS;
export function generatePoints(n) {
    const points = [];
    for (let i = 0; i < n; i++) {
        points.push(new Point());
    }
    for (let i = 1; i < n; i++) {
        while (points[i].checkOverlap(points[i - 1])) {
            points[i] = new Point();
        }
    }
    return points;
}
